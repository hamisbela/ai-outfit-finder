import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, Search, Shirt, Loader2 } from 'lucide-react';
import { analyzeImage } from '../lib/gemini';
import SupportBlock from '../components/SupportBlock';

// Default image path
const DEFAULT_IMAGE = "/default-outfit.jpg"; 

// Default analysis for the pink outfit image
const DEFAULT_ANALYSIS = `## Outfit Analysis

### Brand Identification
🏷️ **Verdict: Zara Essential Collection (85% confidence)**

This appears to be a light pink keyhole collar top from Zara's Essential Collection based on the clean silhouette, collar design, and fabric appearance.

### Style Details

1. **Design Elements:**
   - Light pink/blush short-sleeved top with a collared neckline
   - Distinctive keyhole/teardrop cutout below the collar
   - Fitted silhouette with structured shoulder design
   - Clean minimalist design typical of contemporary business casual wear
   - Short sleeves with a slightly tailored cut

2. **Material Analysis:**
   - Appears to be a polyester-elastane blend with slight stretch
   - Matte finish with slight texture suggesting a premium quality fabric
   - Medium-weight fabric that holds its shape well
   - Likely wrinkle-resistant material suitable for office wear

3. **Color Profile:**
   - Soft blush pink (Pantone 12-1310 or similar)
   - Flattering neutral-warm undertone that works well with multiple skin tones
   - Part of the current season's pastel palette

4. **Styling Category:**
   - Business casual office wear
   - Contemporary minimalist aesthetic
   - Spring/Summer seasonal piece
   - Versatile foundation garment

### Where to Purchase

1. **Exact Match:**
   - **Zara**: "Collared Keyhole Top" - $35.90 - Available online and in stores
   - **Zara Collection ID**: Likely from their spring/summer essentials line

2. **Similar Options:**
   - **H&M**: "Keyhole Collared Blouse" - $24.99
   - **Mango**: "Essential Collar Top" - $39.99
   - **ASOS Design**: "Clean Collar Tee with Cutout Detail" - $28.00
   - **Express**: "Solid Keyhole Collar Top" - $44.50 (often on sale for $29.99)

3. **Budget Alternatives:**
   - **Shein**: "Minimalist Collar Top" - $12.99
   - **Forever 21**: "Collared Keyhole Tee" - $17.99

4. **Premium Versions:**
   - **COS**: "Tailored Collar Top" - $69.00
   - **& Other Stories**: "Structured Collar Blouse" - $79.00

### Styling Suggestions

1. **Office/Professional:**
   - Pair with high-waisted gray trousers and nude pumps
   - Add a structured blazer in navy or charcoal
   - Accessorize with minimal gold jewelry and a leather tote

2. **Casual Daytime:**
   - Style with white wide-leg jeans or denim shorts
   - Add espadrille sandals and a straw tote
   - Layer delicate necklaces for dimension

3. **Evening Out:**
   - Tuck into a metallic pleated skirt
   - Add strappy heeled sandals and statement earrings
   - Elevate with a clutch bag and red lip

4. **Color Pairing Suggestions:**
   - Navy, gray, white, olive green, or burgundy bottoms
   - Gold, rose gold, or silver accessories
   - Nude, white, or black footwear

### Care Instructions
- Machine wash cold with similar colors
- Gentle cycle recommended
- Low heat tumble dry or lay flat to dry
- Cool iron if needed
- Avoid bleach and harsh detergents
- Consider hanging to prevent wrinkles

This versatile top can be dressed up or down for multiple occasions, making it a great addition to a capsule wardrobe. The neutral pink tone and professional silhouette offer excellent styling flexibility while maintaining a polished appearance.`;

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load default image and analysis without API call
    const loadDefaultContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(DEFAULT_IMAGE);
        if (!response.ok) {
          throw new Error('Failed to load default image');
        }
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setImage(base64data);
          setAnalysis(DEFAULT_ANALYSIS);
          setLoading(false);
        };
        reader.onerror = () => {
          setError('Failed to load default image');
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error('Error loading default image:', err);
        setError('Failed to load default image');
        setLoading(false);
      }
    };

    loadDefaultContent();
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Image size should be less than 20MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setError(null);
      handleAnalyze(base64String);
    };
    reader.onerror = () => {
      setError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);

    // Reset the file input so the same file can be selected again
    e.target.value = '';
  }, []);

  const handleAnalyze = async (imageData: string) => {
    setLoading(true);
    setError(null);
    try {
      // Using the default prompt from gemini.ts which now focuses on outfit identification
      const result = await analyzeImage(imageData);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatAnalysis = (text: string) => {
    const lines = text.split('\n');
    let currentSection = '';
    
    return lines.map((line, index) => {
      // H2 headers (##)
      if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '').trim();
        return (
          <h2 key={index} className="text-2xl font-bold text-pink-700 mt-8 mb-4">
            {currentSection}
          </h2>
        );
      }
      
      // H3 headers (###)
      if (line.startsWith('### ')) {
        currentSection = line.replace('### ', '').trim();
        return (
          <h3 key={index} className="text-xl font-bold text-pink-600 mt-6 mb-3">
            {currentSection}
          </h3>
        );
      }
      
      // Bold with emoji verdict
      if (line.includes('**Verdict:')) {
        const [prefix, content] = line.split('**Verdict:');
        const verdictContent = content.split('**')[0];
        const remainder = content.split('**')[1] || '';
        
        return (
          <p key={index} className="text-lg font-bold mb-4">
            {prefix}<span className="text-pink-700 font-bold">Verdict: {verdictContent}</span>{remainder}
          </p>
        );
      }
      
      // Numbered list items with bold headings - section headings
      if (/^\d+\.\s\*\*[^*]+\*\*:?$/.test(line)) {
        const number = line.match(/^\d+/)?.[0] || '';
        const title = line.match(/\*\*([^*]+)\*\*/)?.[1] || '';
        
        return (
          <p key={index} className="font-bold text-gray-900 mt-4 mb-2">
            {number}. {title}
          </p>
        );
      }
      
      // Numbered list items with bold text - items with descriptions
      if (/^\d+\.\s\*\*[^*]+\*\*:/.test(line)) {
        const number = line.match(/^\d+/)?.[0] || '';
        const title = line.match(/\*\*([^*]+)\*\*/)?.[1] || '';
        const restOfLine = line.replace(/^\d+\.\s\*\*[^*]+\*\*:/, '').trim();
        
        return (
          <div key={index} className="mb-3">
            <p className="font-semibold text-gray-900">
              {number}. <span className="font-bold">{title}:</span>{restOfLine}
            </p>
          </div>
        );
      }
      
      // Brand mentions with prices (lines that start with a dash and have bold text and pricing)
      if (line.trim().startsWith('- **') && line.includes('"') && line.includes('$')) {
        const brandMatch = line.match(/\*\*([^*]+)\*\*/);
        const quotedTextMatch = line.match(/"([^"]+)"/);
        const priceMatch = line.match(/\$\d+\.\d+/);
        
        const brand = brandMatch ? brandMatch[1] : '';
        const itemName = quotedTextMatch ? quotedTextMatch[1] : '';
        const price = priceMatch ? priceMatch[0] : '';
        
        // Any text after price
        const afterPrice = line.split(price)[1] || '';
        
        return (
          <li key={index} className="ml-6 mb-2 list-none relative">
            <span className="absolute -left-4 top-1.5 w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="font-bold text-gray-800">{brand}</span>: "{itemName}" - <span className="text-pink-700">{price}</span>{afterPrice}
          </li>
        );
      }
      
      // Indented bullet points (with leading spaces)
      if (line.trim().startsWith('- ') && line.startsWith('   -')) {
        return (
          <li key={index} className="ml-10 mb-2 list-none relative">
            <span className="absolute -left-4 top-1.5 w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="text-gray-700">{line.trim().substring(2)}</span>
          </li>
        );
      }
      
      // Standard bullet points
      if (line.trim().startsWith('- ')) {
        return (
          <li key={index} className="ml-6 mb-2 list-none relative">
            <span className="absolute -left-4 top-1.5 w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="text-gray-700">{line.trim().substring(2)}</span>
          </li>
        );
      }
      
      // Empty lines
      if (!line.trim()) {
        return <div key={index} className="h-2"></div>;
      }
      
      // Regular text
      return (
        <p key={index} className="mb-3 text-gray-700">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-gray-50 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Free AI Outfit Finder</h1>
          <p className="text-base sm:text-lg text-gray-600">Upload any outfit photo and instantly identify the brand, where to buy it, and get styling tips</p>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-12 border border-gray-200">
          <div className="flex flex-col items-center justify-center mb-6">
            <label 
              htmlFor="image-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Upload className="h-5 w-5" />
              Upload Outfit to Identify
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleImageUpload}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG, JPEG or WEBP (MAX. 20MB)</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {loading && !image && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="animate-spin h-8 w-8 text-pink-600" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}

          {image && (
            <div className="mb-6">
              <div className="relative rounded-lg mb-4 overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={image}
                  alt="Outfit to analyze"
                  className="w-full h-auto max-h-[500px] object-contain mx-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnalyze(image)}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="-ml-1 mr-2 h-5 w-5" />
                      Identify Outfit
                    </>
                  )}
                </button>
                <button
                  onClick={triggerFileInput}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Another Outfit
                </button>
              </div>
            </div>
          )}

          {analysis && (
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Shirt className="h-7 w-7 text-pink-600 mr-2" />
                Fashion Analysis
              </h2>
              <div className="text-gray-700">
                {formatAnalysis(analysis)}
              </div>
            </div>
          )}
        </div>

        <SupportBlock />

        <div className="prose max-w-none my-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Free AI Outfit Finder: Identify Clothing Brands Instantly</h2>
          
          <p>Welcome to our cutting-edge <strong>free AI outfit finder</strong> tool, designed to help you identify clothing brands, styles, and where to shop with exceptional accuracy. In today's vast fashion landscape, finding where to purchase that perfect outfit you spotted can be challenging – our <strong>free AI outfit finder</strong> is here to help.</p>

          <h3>How Our AI Outfit Finder Works</h3>
          <p>Our sophisticated <strong>free AI outfit finder</strong> uses advanced artificial intelligence to analyze uploaded outfit photos and identify their brands, style details, and shopping sources. Simply upload any fashion image, and our tool will provide a comprehensive analysis. Whether you're a fashion enthusiast, shopper, or stylist, our <strong>free AI outfit finder</strong> gives you the insights you need.</p>

          <h3>Why Choose Our Free AI Outfit Finder</h3>
          <ul>
            <li>Advanced AI fashion recognition technology that identifies brands and styles</li>
            <li>Detailed shopping guides with multiple purchasing options at various price points</li>
            <li>Fast processing with instant results for any outfit you upload</li>
            <li>Personalized styling suggestions to maximize your wardrobe</li>
            <li>100% free to use with no hidden costs or subscriptions</li>
            <li>Privacy-focused approach that doesn't store your uploaded photos</li>
            <li>Regular updates to keep pace with evolving fashion trends and brands</li>
          </ul>

          <h3>When to Use Our Free AI Outfit Finder:</h3>
          <ul>
            <li>When you spot a stylish outfit online and want to know where to buy it</li>
            <li>If you're trying to rebuild an outfit from a fashion magazine or social media</li>
            <li>When shopping for similar items at different price points</li>
            <li>To get styling suggestions for items similar to what you already own</li>
            <li>For finding dupes or alternatives to designer pieces</li>
            <li>When creating a capsule wardrobe and need versatile pieces</li>
          </ul>

          <p>Try our <strong>free AI outfit finder</strong> today and take the guesswork out of fashion shopping. No registration required – simply upload an outfit photo and let our <strong>free AI outfit finder</strong> analyze it instantly!</p>
        </div>

        <SupportBlock />
      </div>
    </div>
  );
}