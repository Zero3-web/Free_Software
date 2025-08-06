import { Download, Star, ExternalLink, Shield, Users, Zap } from 'lucide-react';

interface SoftwareCardProps {
  name: string;
  description: string;
  features: string[];
  pros?: string[];
  cons?: string[];
  rating?: number;
  downloadUrl?: string;
  websiteUrl?: string;
  category: string;
  isPremium?: boolean;
  isOpenSource?: boolean;
  platforms?: string[];
  icon?: string;
  image?: string;
}

export default function SoftwareCard({
  name,
  description,
  features,
  pros = [],
  cons = [],
  rating,
  downloadUrl,
  websiteUrl,
  category,
  isPremium = false,
  isOpenSource = false,
  platforms = [],
  icon = name.charAt(0),
  image
}: SoftwareCardProps) {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-start gap-6 mb-6">
        {/* Icon/Image */}
        <div className="flex-shrink-0">
          {image ? (
            <img 
              src={image} 
              alt={`${name} logo`}
              className="w-16 h-16 rounded-xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{icon}</span>
            </div>
          )}
        </div>

        {/* Title and Meta */}
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600">
                  {rating}/5
                </span>
              </div>
            )}
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-100">
              {category}
            </span>
            {!isPremium && (
              <span className="px-3 py-1 bg-green-100">
                <Zap className="w-3 h-3" />
                Gratis
              </span>
            )}
            {isOpenSource && (
              <span className="px-3 py-1 bg-purple-100">
                <Users className="w-3 h-3" />
                Open Source
              </span>
            )}
            {platforms.length > 0 && (
              <span className="px-3 py-1 bg-gray-100">
                {platforms.join(', ')}
              </span>
            )}
          </div>

          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900">
          <Shield className="w-5 h-5 text-blue-500" />
          Características principales
        </h4>
        <ul className="grid md:grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pros and Cons */}
      {(pros.length > 0 || cons.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {pros.length > 0 && (
            <div>
              <h5 className="text-md font-semibold text-green-700">
                ✓ Ventajas
              </h5>
              <ul className="space-y-1">
                {pros.map((pro, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cons.length > 0 && (
            <div>
              <h5 className="text-md font-semibold text-red-700">
                ✗ Desventajas
              </h5>
              <ul className="space-y-1">
                {cons.map((con, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    <span className="text-red-500 mt-0.5">-</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-4 h-4" />
            Descargar
          </a>
        )}
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300"
          >
            <ExternalLink className="w-4 h-4" />
            Sitio web
          </a>
        )}
      </div>
    </div>
  );
}
