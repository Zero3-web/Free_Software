import { Check, X, Star } from 'lucide-react';

interface ComparisonItem {
  name: string;
  free: boolean;
  openSource: boolean;
  rating: number;
  platforms: string[];
  features: {
    [key: string]: boolean | string;
  };
  pros: string[];
  cons: string[];
  bestFor: string;
}

interface ComparisonTableProps {
  title: string;
  items: ComparisonItem[];
  featureLabels: {
    [key: string]: string;
  };
}

export default function ComparisonTable({ title, items, featureLabels }: ComparisonTableProps) {
  const featureKeys = Object.keys(featureLabels);

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold text-gray-900">
        {title}
      </h3>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="bg-white">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              {items.map((item, index) => (
                <div key={index} className="text-center">
                  <h4 className="font-bold text-lg text-gray-900">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600">
                        {item.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {item.free && (
                      <span className="px-2 py-1 bg-green-100">
                        Gratis
                      </span>
                    )}
                    {item.openSource && (
                      <span className="px-2 py-1 bg-purple-100">
                        Open Source
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.platforms.join(', ')}
                  </div>
                </div>
              ))}
            </div>

            {/* Features Comparison */}
            <div className="p-6">
              <h5 className="font-semibold text-gray-900">
                Comparación de características
              </h5>
              
              <div className="space-y-3">
                {featureKeys.map((featureKey) => (
                  <div key={featureKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-3 border-b border-gray-100">
                    <div className="font-medium text-gray-700">
                      {featureLabels[featureKey]}
                    </div>
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-center md:justify-start">
                        {typeof item.features[featureKey] === 'boolean' ? (
                          item.features[featureKey] ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">
                            {item.features[featureKey]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Best For Section */}
            <div className="p-6 bg-gray-50">
              <h5 className="font-semibold text-gray-900">
                Mejor para
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-gray-600">
                      {item.bestFor}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, index) => (
                  <div key={index}>
                    <h6 className="font-semibold text-gray-900">
                      {item.name}
                    </h6>
                    
                    {item.pros.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-green-700">
                          ✓ Pros
                        </div>
                        <ul className="space-y-1">
                          {item.pros.map((pro, proIndex) => (
                            <li key={proIndex} className="text-xs text-gray-600">
                              <span className="text-green-500 text-xs mt-0.5">+</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.cons.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-red-700">
                          ✗ Contras
                        </div>
                        <ul className="space-y-1">
                          {item.cons.map((con, conIndex) => (
                            <li key={conIndex} className="text-xs text-gray-600">
                              <span className="text-red-500 text-xs mt-0.5">-</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
