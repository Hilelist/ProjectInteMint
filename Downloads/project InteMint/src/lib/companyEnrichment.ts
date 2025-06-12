import axios from 'axios';

export interface CompanyPreview {
  name: string;
  logo: string;
  description?: string;
  industry?: string;
  founded_year?: number;
  employee_count?: number;
  headquarters?: string;
  social_links?: Record<string, string>;
  error?: string;
}

export async function getCompanyPreview(website: string): Promise<CompanyPreview> {
  try {
    // Remove protocol and www if present
    const cleanWebsite = website.replace(/^(https?:\/\/)?(www\.)?/, '');
    
    // For now, return a simple preview
    // In a real app, you might want to use a service like Clearbit or similar
    return {
      name: cleanWebsite.split('.')[0].charAt(0).toUpperCase() + cleanWebsite.split('.')[0].slice(1),
      logo: `https://logo.clearbit.com/${cleanWebsite}`,
      // Add placeholder data for other fields
      description: '',
      industry: '',
      founded_year: undefined,
      employee_count: undefined,
      headquarters: '',
      social_links: {}
    };
  } catch (error) {
    console.error('Error fetching company preview:', error);
    return {
      name: '',
      logo: '',
      error: 'Failed to fetch company info'
    };
  }
} 