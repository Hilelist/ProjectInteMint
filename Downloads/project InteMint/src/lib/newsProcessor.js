import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);
const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

async function fetchAndProcessNews() {
  const { data: competitors } = await supabase
    .from('competitors')
    .select('id');

  for (const competitor of competitors) {
    // 1. Load existing events
    const { data: existing } = await supabase
      .from('competitors')
      .select('events')
      .eq('id', competitor.id)
      .single();
    const events = existing?.events || [];

    // 2. Fetch news via RSS2JSON
    const resp = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=${encodeURIComponent(
        competitor.id
      )}`
    ).then(r => r.json());

    for (const item of resp.items) {
      events.push({
        date:    item.pubDate,
        type:    'Investment',   // adjust classification logic as needed
        outcome: 'Success',      // adjust classification logic as needed
        source:  item.source_id || 'RSS',
        amount:  null
      });
    }

    // 3. Recalculate benchmark_score
    const nInvest     = events.filter(e => e.type === 'Investment').length;
    const nInnov      = events.filter(e => e.type === 'Innovation').length;
    const totalEvents = events.length;
    const benchmark_score = totalEvents
      ? ((nInvest * 2) + nInnov) / totalEvents
      : 0;

    // 4. Generate summary of last 5 events
    const recentFive = events.slice(-5);
    const aiResp = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a strategic analyst.' },
        {
          role: 'user',
          content: `Summarize these events in 3 sentences: ${JSON.stringify(
            recentFive
          )}`
        }
      ]
    });
    const last_summary =
      aiResp.choices?.[0]?.message?.content.trim() || '';

    // 5. Upsert back to Supabase
    await supabase.from('competitors').upsert({
      id:              competitor.id,
      events,
      benchmark_score,
      last_summary
    });
    console.log(`Updated competitor ${competitor.id}`);
  }
}

fetchAndProcessNews()
  .then(() => console.log('Done'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  }); 