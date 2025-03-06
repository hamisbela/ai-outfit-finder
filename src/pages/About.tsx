import React from 'react';
import { Shirt } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 prose max-w-none">
          <p>
            Welcome to AI Outfit Finder, your trusted resource for AI-powered fashion identification.
            We're passionate about helping fashion enthusiasts, shoppers, and style-conscious individuals identify
            the perfect outfit, discover where to buy it, and get style recommendations through advanced technology
            that analyzes visual characteristics of clothing and accessories.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to make fashion identification accessible to everyone by providing a free, easy-to-use
            tool. In an era of endless style options across countless retailers, we aim to help you
            quickly identify outfits you love, understand where to purchase them, and receive personalized styling advice.
            Our tool is designed to eliminate the frustration of finding that perfect piece you spotted online
            or in person, helping more people express their personal style with confidence.
          </p>

          <h2>Why Choose Our Tool?</h2>
          <ul>
            <li>Advanced AI recognition algorithms trained on diverse fashion datasets</li>
            <li>Detailed analysis reports with brand identification</li>
            <li>Direct links to purchase options from various retailers</li>
            <li>Price comparisons to help you find the best deals</li>
            <li>Personalized styling suggestions based on the identified items</li>
            <li>Completely free to use</li>
            <li>No registration required</li>
            <li>Privacy-focused approach</li>
            <li>User-friendly interface for fashion enthusiasts of all tech levels</li>
          </ul>

          <h2>Support Our Project</h2>
          <p>
            We're committed to keeping this AI outfit finder tool free and accessible to everyone.
            If you find our tool useful, consider supporting us by buying us a coffee.
            Your support helps us maintain and improve the service, ensuring it remains available to all
            who want to identify and purchase the perfect outfit.
          </p>

          <div className="mt-8 text-center">
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-outfit-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors text-lg font-semibold"
            >
              Support Our Work
            </a>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
              <Shirt className="h-5 w-5 text-pink-500 mr-2" />
              Important Disclaimer
            </h3>
            <p className="text-gray-700">
              While our AI outfit finder tool uses sophisticated algorithms to analyze clothing, it's important to understand that no identification system is 100% accurate. Fashion trends evolve rapidly, and similar designs may appear across multiple brands. 
            </p>
            <p className="text-gray-700 mt-2">
              Our tool should be used as a helpful guide in your fashion journey, not as a definitive source. We encourage checking multiple retailers and considering various options when making purchase decisions. Prices and availability may vary based on location and time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}