import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AddCompetitorForm() {
  const [form, setForm] = useState({
    name: '',
    industry: '',
    lastFunding: { amount: '', round: '', date: '' },
    riskLevel: 'medium',
    recentActivity: { headline: '', url: '', date: '' }
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prépare l’objet à insérer
    const payload = {
      name: form.name,
      industry: form.industry,
      last_funding_amount: form.lastFunding.amount,
      last_funding_round: form.lastFunding.round,
      last_funding_date: form.lastFunding.date,
      risk_level: form.riskLevel,
      recent_activity_headline: form.recentActivity.headline,
      recent_activity_url: form.recentActivity.url,
      recent_activity_date: form.recentActivity.date
    };

    const { error } = await supabase
  .from('competitors')
  .insert([payload]);

    if (error) {
      alert('Error adding competitor: ' + error.message);
    } else {
      alert('Competitor added!');
      // Optionnel : reset du formulaire
      setForm({
        name: '',
        industry: '',
        lastFunding: { amount: '', round: '', date: '' },
        riskLevel: 'medium',
        recentActivity: { headline: '', url: '', date: '' }
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold">Add a Competitor</h2>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Industry"
        value={form.industry}
        onChange={e => setForm({ ...form, industry: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Funding Amount (e.g. $5M)"
          value={form.lastFunding.amount}
          onChange={e => setForm({ 
            ...form, 
            lastFunding: { ...form.lastFunding, amount: e.target.value } 
          })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Funding Round (e.g. Series A)"
          value={form.lastFunding.round}
          onChange={e => setForm({ 
            ...form, 
            lastFunding: { ...form.lastFunding, round: e.target.value } 
          })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          placeholder="Funding Date"
          value={form.lastFunding.date}
          onChange={e => setForm({ 
            ...form, 
            lastFunding: { ...form.lastFunding, date: e.target.value } 
          })}
          className="border px-3 py-2 rounded"
          required
        />
      </div>

      <select
        value={form.riskLevel}
        onChange={e => setForm({ ...form, riskLevel: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="low">Low Risk</option>
        <option value="medium">Medium Risk</option>
        <option value="high">High Risk</option>
      </select>

      <input
        type="text"
        placeholder="Recent Activity Headline"
        value={form.recentActivity.headline}
        onChange={e => setForm({
          ...form,
          recentActivity: { ...form.recentActivity, headline: e.target.value }
        })}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="url"
        placeholder="Activity URL"
        value={form.recentActivity.url}
        onChange={e => setForm({
          ...form,
          recentActivity: { ...form.recentActivity, url: e.target.value }
        })}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="date"
        placeholder="Activity Date"
        value={form.recentActivity.date}
        onChange={e => setForm({
          ...form,
          recentActivity: { ...form.recentActivity, date: e.target.value }
        })}
        className="w-full border px-3 py-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Adding…' : 'Add Competitor'}
      </button>
    </form>
  );
}
