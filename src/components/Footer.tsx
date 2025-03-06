import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shirt, Tag, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white border-t border-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shirt className="h-6 w-6 text-pink-200" />
              <h3 className="text-lg font-semibold text-white">AI Outfit Finder</h3>
            </div>
            <p className="text-pink-100">
              Your AI-powered companion for fashion identification. 
              Upload any outfit image and instantly identify the brand, where to buy it, and get styling suggestions for your wardrobe.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Shirt className="h-4 w-4 text-pink-300" />
                <Link to="/" className="text-pink-100 hover:text-white">
                  Outfit Finder
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-pink-300" />
                <Link to="/about" className="text-pink-100 hover:text-white">
                  About Our Service
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Search className="h-4 w-4 text-pink-300" />
                <Link to="/contact" className="text-pink-100 hover:text-white">
                  Get Help
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support Our Project</h3>
            <p className="text-pink-100 mb-4">
              Help us maintain and improve our free AI outfit finder for fashion enthusiasts and shoppers everywhere.
            </p>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-outfit-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Buy us a coffee
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-pink-500">
          <div className="text-center text-pink-200">
            <p className="mb-2">&copy; {new Date().getFullYear()} AI Outfit Finder. Helping identify fashion in a world of endless styles.</p>
            <p className="text-sm">
              For informational purposes only. Use outfit identification results as a guide, not guaranteed matches.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}