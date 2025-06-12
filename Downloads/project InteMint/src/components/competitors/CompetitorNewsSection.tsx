/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { Newspaper, Loader2, AlertCircle, ChevronDown, Filter } from 'lucide-react';
import { supabase } from '@/utils/supabaseClient';

interface NewsEvent {
  date: string;
  type: string;
  outcome: string;
  source: string;
  amount: number | null;
}

interface CompetitorNewsSectionProps {
  competitorName: string;
  competitorId: string;
}

const OUTCOMES = [
  { id: 'all', label: 'All Outcomes' },
  { id: 'Positive', label: 'Success' },
  { id: 'Negative', label: 'Failed' },
  { id: 'Neutral', label: 'Ongoing' }
];

export default function CompetitorNewsSection({
  competitorName,
  competitorId
}: CompetitorNewsSectionProps) {
  const [events, setEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedOutcome, setSelectedOutcome] = useState('all');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showOutcomeDropdown, setShowOutcomeDropdown] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch competitor data including events
        const { data: competitor, error: fetchError } = await supabase
          .from('competitors')
          .select('events')
          .eq('id', competitorId)
          .single();

        if (fetchError) throw fetchError;

        // Sort events by date (newest first)
        const sortedEvents = (competitor?.events || []).sort(
          (a: NewsEvent, b: NewsEvent) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setEvents(sortedEvents);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch events';
        setError(errorMessage);
        console.error('Events fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [competitorId]);

  // Get unique event types
  const eventTypes: string[] = ['all', ...new Set(events.map((e: NewsEvent) => e.type))];

  // Apply filters
  const filteredEvents = events.filter((event: NewsEvent) => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesOutcome =
      selectedOutcome === 'all' || event.outcome === selectedOutcome;
    const matchesDate =
      !showDateFilter ||
      new Date().getTime() - new Date(event.date).getTime() <=
        30 * 24 * 60 * 60 * 1000;
    return matchesType && matchesOutcome && matchesDate;
  });

  if (loading) {
    return (
      <div className="mt-4 flex items-center justify-center py-4">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="ml-2 text-sm text-gray-500">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 flex items-center justify-center py-4 text-red-500">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900 flex items-center">
          <Newspaper className="w-4 h-4 mr-1" />
          {competitorName} - Recent Events
        </h4>
        <div className="flex items-center space-x-2">
          {/* Type Filter */}
          <div className="relative">
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <Filter className="w-4 h-4" />
              <span>
                {selectedType === 'all'
                  ? 'All Types'
                  : selectedType}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showTypeDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {eventTypes.map((type: string) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type);
                      setShowTypeDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                      selectedType === type
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Outcome Filter */}
          <div className="relative">
            <button
              onClick={() => setShowOutcomeDropdown(!showOutcomeDropdown)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <Filter className="w-4 h-4" />
              <span>
                {OUTCOMES.find(o => o.id === selectedOutcome)?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showOutcomeDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {OUTCOMES.map(outcome => (
                  <button
                    key={outcome.id}
                    onClick={() => {
                      setSelectedOutcome(outcome.id);
                      setShowOutcomeDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                      selectedOutcome === outcome.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {outcome.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Toggle */}
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className={`px-2 py-1 text-xs rounded-full ${
              showDateFilter
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <ul className="space-y-3">
          {filteredEvents.map((event: NewsEvent, index: number) => (
            <li key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        event.type === 'Investment'
                          ? 'bg-green-100 text-green-700'
                          : event.type === 'Innovation'
                          ? 'bg-blue-100 text-blue-700'
                          : event.type === 'Partnership'
                          ? 'bg-purple-100 text-purple-700'
                          : event.type === 'Acquisition'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {event.type}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        event.outcome === 'Positive'
                          ? 'bg-green-100 text-green-700'
                          : event.outcome === 'Negative'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {event.outcome}
                    </span>
                  </div>
                  {event.amount != null && (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ${event.amount.toLocaleString()}M
                    </p>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Source: {event.source}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No events found</p>
      )}
    </div>
  );
}