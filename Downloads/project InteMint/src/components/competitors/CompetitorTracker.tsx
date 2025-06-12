import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/utils/supabaseClient';
import { Competitor } from '@/types/competitor';
import { Plus, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getCompanyPreview, CompanyPreview } from '@/lib/companyEnrichment';
import CompetitorNewsSection from './CompetitorNewsSection';

// Freemium gating: free users can track up to 3 competitors
const isPremium = false; // TODO: replace with real plan check
const FREE_COMPETITOR_LIMIT = 3;

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('CompetitorTracker error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Utility to parse JSON/string social links
const parseSocialLinks = (socialLinks: any): Record<string, string> | null => {
  if (!socialLinks) return null;
  if (typeof socialLinks === 'object' && !Array.isArray(socialLinks)) {
    return socialLinks;
  }
  if (typeof socialLinks === 'string') {
    try {
      const parsed = JSON.parse(socialLinks);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      if (socialLinks.startsWith('http')) {
        return { website: socialLinks };
      }
    }
  }
  return null;
};

export default function CompetitorTracker() {
  const { user } = useAuth();
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [form, setForm] = useState({ website: '', name: '' });
  const [preview, setPreview] = useState<CompanyPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch list
  const fetchCompetitors = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCompetitors(data || []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch competitors';
      console.error(msg);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { if (user) fetchCompetitors(); }, [user]);

  // Add
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error('Please sign in to add competitors');
    if (!preview || preview.error) return;
    if (!isPremium && competitors.length >= FREE_COMPETITOR_LIMIT) {
      return toast.error(`Free users can only add up to ${FREE_COMPETITOR_LIMIT} competitors.`);
    }
    try {
      const payload = {
        user_id: user.id,
        name: form.name,
        website: form.website,
        logo_url: preview.logo,
        description: preview.description,
        industry: preview.industry,
        founded_year: preview.founded_year,
        employee_count: preview.employee_count,
        headquarters: preview.headquarters,
        social_links: preview.social_links,
      };
      const { data, error } = await supabase
        .from('competitors')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      setCompetitors(prev => [...prev, data!]);
      toast.success('Competitor added successfully');
      setForm({ website: '', name: '' });
      setPreview(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to add competitor';
      console.error(msg);
      toast.error(msg);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('competitors')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setCompetitors(prev => prev.filter(c => c.id !== id));
      toast.success('Competitor removed');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Delete failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Preview on website change
  const handleWebsiteChange = (website: string) => {
    setForm(p => ({ ...p, website }));
    if (website) {
      getCompanyPreview(website)
        .then(p => {
          setPreview(p);
          if (!p.error) setForm(prev => ({ ...prev, name: p.name }));
        })
        .catch(err => {
          console.error(err);
          setPreview({ name: '', logo: '', error: err.message });
        });
    } else {
      setPreview(null);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600">Please sign in to view competitors</p>
        </div>
      </div>
    );
  }

  // Show only up to limit if free
  const visibleCompetitors = isPremium
    ? competitors
    : competitors.slice(0, FREE_COMPETITOR_LIMIT);

  return (
    <ErrorBoundary>
      <>
        {/* FREE-TIER STATUS BANNER */}
        {!isPremium && (
          <div className="mb-4 p-4 bg-yellow-50 rounded-md text-yellow-700">
            You are tracking <strong>{competitors.length}</strong> competitors
            (free limit: {FREE_COMPETITOR_LIMIT}).{' '}
            {competitors.length >= FREE_COMPETITOR_LIMIT && (
              <>
                Upgrade to premium to manage more companies.{' '}
                <a href="/pricing" className="underline">
                  See plans
                </a>
                .
              </>
            )}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Competitor Tracker
            </h1>
            <p className="text-gray-600">
              Monitor your competitors' activities and stay updated
            </p>
          </div>

          {/* ADD FORM */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={form.website}
                onChange={e => handleWebsiteChange(e.target.value)}
                placeholder="Enter competitor's website"
                className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={
                  !isPremium && competitors.length >= FREE_COMPETITOR_LIMIT
                }
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center ${
                  !isPremium && competitors.length >= FREE_COMPETITOR_LIMIT
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Competitor
              </button>
            </div>
          </form>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-600">
                  Loading competitors...
                </span>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchCompetitors}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : visibleCompetitors.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No competitors added yet</p>
              </div>
            ) : (
              visibleCompetitors.map(competitor => {
                const socialLinks = parseSocialLinks(
                  competitor.social_links
                );
                return (
                  <div
                    key={competitor.id}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    {/* CARD HEADER */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                        {competitor.logo_url && (
                          <img
                            src={competitor.logo_url}
                            alt={`${competitor.name} logo`}
                            className="w-12 h-12 rounded-lg object-contain"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {competitor.name}
                          </h3>
                          <a
                            href={competitor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            {competitor.website}
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                      </div>
                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDelete(competitor.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </div>

                    {/* NEWS SECTION */}
                    <Suspense
                      fallback={
                        <div className="mt-4 flex items-center justify-center py-4">
                          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                          <span className="ml-2 text-sm text-gray-500">
                            Loading news...
                          </span>
                        </div>
                      }
                    >
                      <CompetitorNewsSection
                        competitorName={competitor.name}
                        competitorId={competitor.id}
                      />
                    </Suspense>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </>
    </ErrorBoundary>
  );
}
