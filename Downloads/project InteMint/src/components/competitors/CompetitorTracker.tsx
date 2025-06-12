import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/utils/supabaseClient';
import { Competitor } from '@/types/competitor';
import { Plus, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getCompanyPreview, CompanyPreview } from '@/lib/companyEnrichment';
import CompetitorNewsSection from './CompetitorNewsSection';

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
            <h2 className="text-lg font-semibold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
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

const parseSocialLinks = (socialLinks: any): Record<string, string> | null => {
  console.log('Social links:', socialLinks, 'Type:', typeof socialLinks);
  
  if (!socialLinks) return null;
  
  // If it's already an object, return it
  if (typeof socialLinks === 'object' && !Array.isArray(socialLinks)) {
    return socialLinks;
  }
  
  // If it's a string, try to parse it as JSON
  if (typeof socialLinks === 'string') {
    try {
      const parsed = JSON.parse(socialLinks);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // If it's not valid JSON, treat it as a single URL
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch competitors';
      console.error('Error fetching competitors:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCompetitors();
    }
  }, [user]);

  const handleAddCompetitor = async (competitor: Omit<Competitor, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('competitors')
        .insert([competitor])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setCompetitors((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error('Error adding competitor:', error);
    }
  };

  const handleDelete = async (id: string) => {
    // ... rest of the file ...
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to add competitors');
      return;
    }
    if (!preview || preview.error) return;
    try {
      console.log('Attempting to insert competitor with data:', {
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
      });

      const { data, error } = await supabase.from('competitors').insert([
        {
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
        },
      ]).select();

      console.log('Supabase insert response:', { data, error });

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      if (data) {
        console.log('Successfully inserted competitor:', data);
        toast.success('Competitor added successfully');
        setForm({ website: '', name: '' });
        setPreview(null);
        fetchCompetitors();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add competitor';
      console.error('Error adding competitor:', err);
      toast.error(errorMessage);
    }
  };

  const handleWebsiteChange = (website: string) => {
    setForm(prev => ({ ...prev, website }));
    if (website) {
      getCompanyPreview(website)
        .then(preview => {
          setPreview(preview);
          if (!preview.error) {
            setForm(prev => ({ ...prev, name: preview.name }));
          }
        })
        .catch(error => {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch company info';
          console.error('Error fetching company preview:', errorMessage);
          setPreview({ name: '', logo: '', error: errorMessage });
        });
    } else {
      setPreview(null);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please sign in to view competitors</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Competitor Tracker</h1>
          <p className="text-gray-600">
            Monitor your competitors' activities and stay updated with their latest news
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={form.website}
                onChange={(e) => handleWebsiteChange(e.target.value)}
                placeholder="Enter competitor's website"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {preview && !preview.error && (
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-3">
                    {preview.logo && (
                      <img
                        src={preview.logo}
                        alt={`${preview.name} logo`}
                        className="w-12 h-12 rounded-lg object-contain"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{preview.name}</h3>
                      {preview.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{preview.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {preview?.error && (
                <p className="mt-2 text-sm text-red-600">{preview.error}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Competitor
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="ml-2 text-gray-600">Loading competitors...</span>
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
          ) : competitors.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No competitors added yet</p>
            </div>
          ) : (
            competitors.map((competitor) => {
              const socialLinks = parseSocialLinks(competitor.social_links);
              
              return (
                <div key={competitor.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {competitor.logo_url && (
                        <img
                          src={competitor.logo_url}
                          alt={`${competitor.name} logo`}
                          className="w-12 h-12 rounded-lg object-contain"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{competitor.name}</h3>
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
                  </div>

                  <div className="space-y-2 mb-4">
                    {competitor.description && (
                      <p className="text-sm text-gray-600">{competitor.description}</p>
                    )}
                    {competitor.industry && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Industry:</span> {competitor.industry}
                      </p>
                    )}
                    {competitor.founded_year && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Founded:</span> {competitor.founded_year}
                      </p>
                    )}
                    {competitor.employee_count && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Employees:</span>{' '}
                        {competitor.employee_count.toLocaleString()}
                      </p>
                    )}
                    {competitor.headquarters && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">HQ:</span> {competitor.headquarters}
                      </p>
                    )}
                    {socialLinks && Object.keys(socialLinks).length > 0 && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Social Links:</span>
                        <div className="mt-1 space-y-1">
                          {Object.entries(socialLinks).map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-600 hover:text-blue-800"
                            >
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Suspense
                    fallback={
                      <div className="mt-4 flex items-center justify-center py-4">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        <span className="ml-2 text-sm text-gray-500">Loading news...</span>
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
    </ErrorBoundary>
  );
}
