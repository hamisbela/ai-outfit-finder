import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Menu, X, Search, Shirt } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-pink-600 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-xl font-bold text-white flex-shrink-0 flex items-center">
            <Shirt className="h-6 w-6 text-pink-200 mr-2" />
            AI Outfit Finder
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-pink-100 hover:text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-300 sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link to="/about" className="text-pink-100 hover:text-white">About</Link>
            <Link to="/contact" className="text-pink-100 hover:text-white">Contact</Link>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-outfit-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
            >
              <Coffee className="h-4 w-4" />
              Buy us a coffee
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-4 space-y-1 border-t border-pink-500">
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-pink-100 hover:text-white hover:bg-pink-700 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-pink-100 hover:text-white hover:bg-pink-700 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-outfit-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-900 hover:bg-yellow-500 bg-yellow-400 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <Coffee className="h-4 w-4" />
              Buy us a coffee
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}