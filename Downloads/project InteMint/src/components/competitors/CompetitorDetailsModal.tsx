import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, ExternalLink } from 'lucide-react';
import { Competitor } from '@/types/competitor';

interface CompetitorDetailsModalProps {
  competitor: Competitor;
  onClose: () => void;
}

export default function CompetitorDetailsModal({ competitor, onClose }: CompetitorDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4 mb-6">
            <div className="relative h-16 w-16 flex-shrink-0">
              <img
                src={competitor.logo_url || ''}
                alt={`${competitor.name} logo`}
                className="h-16 w-16 object-contain rounded-lg bg-white"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-2xl font-semibold text-gray-500">
                  {competitor.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {competitor.name}
              </Dialog.Title>
              <a
                href={competitor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 flex items-center"
              >
                {competitor.website}
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {competitor.industry && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                <p className="mt-1 text-sm text-gray-900">{competitor.industry}</p>
              </div>
            )}
            {competitor.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-sm text-gray-900">{competitor.description}</p>
              </div>
            )}
            {competitor.founded_year && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Founded</h3>
                <p className="mt-1 text-sm text-gray-900">{competitor.founded_year}</p>
              </div>
            )}
            {competitor.employee_count && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Employees</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {competitor.employee_count.toLocaleString()}
                </p>
              </div>
            )}
            {competitor.headquarters && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Headquarters</h3>
                <p className="mt-1 text-sm text-gray-900">{competitor.headquarters}</p>
              </div>
            )}
            {competitor.social_links && Object.keys(competitor.social_links).length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Social Links</h3>
                <div className="mt-1 space-y-1">
                  {Object.entries(competitor.social_links).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
} 