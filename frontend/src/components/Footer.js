import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

const LOGO_SRC = '/images/brand/swsg-logo-vector-inverted.webp';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed to newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[hsl(211,68%,16%)] text-white" data-testid="main-footer">
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={LOGO_SRC} alt="SWSG - Southern Water Solutions Group" className="h-24 sm:h-28 w-auto object-contain" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              <span className="font-semibold text-white">Southern Water Solutions Group</span> — practical pump, irrigation and agricultural water solutions across South Africa. Supply, advice and quotes.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <a href="tel:+27814177689" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-[hsl(123,46%,54%)]" /> +27 81 417 7689
              </a>
              <a href="mailto:info@swsg.co.za" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-[hsl(123,46%,54%)]" /> info@swsg.co.za
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[hsl(123,46%,54%)]" /> South Africa
              </div>
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="font-manrope font-semibold text-sm uppercase tracking-wider mb-4 text-gray-200">Divisions</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Pumps', path: '/pumps' },
                { label: 'Irrigation', path: '/irrigation' },
                { label: 'Agriculture', path: '/agriculture' },
                { label: 'Store', path: '/store' },
              ].map(link => (
                <Link key={link.path} to={link.path} className="block text-sm text-gray-300 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-manrope font-semibold text-sm uppercase tracking-wider mb-4 text-gray-200">Quick Links</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Consultation', path: '/consultation' },
                { label: 'Request a Quote', path: '/cart' },
                { label: 'About SWSG', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map(link => (
                <Link key={link.path} to={link.path} className="block text-sm text-gray-300 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-manrope font-semibold text-sm uppercase tracking-wider mb-4 text-gray-200">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">Get updates on new products and water solutions.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-gray-400 outline-none focus:border-[hsl(123,46%,54%)]"
                data-testid="newsletter-input"
              />
              <Button type="submit" size="sm" className="bg-[hsl(211,70%,39%)] hover:bg-[hsl(211,70%,32%)] text-white rounded-sm" data-testid="newsletter-submit">
                Join
              </Button>
            </form>
            <div className="mt-6">
              <h3 className="font-manrope font-semibold text-sm uppercase tracking-wider mb-3 text-gray-200">Info</h3>
              <div className="space-y-2.5 text-sm text-gray-300">
                <p className="hover:text-white transition-colors cursor-pointer">Shipping &amp; Returns</p>
                <p className="hover:text-white transition-colors cursor-pointer">Terms &amp; Conditions</p>
                <p className="hover:text-white transition-colors cursor-pointer">Privacy Policy</p>
                <p className="hover:text-white transition-colors cursor-pointer">FAQ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Southern Water Solutions Group (SWSG). All rights reserved. &bull; swsg.co.za
        </div>
      </div>
    </footer>
  );
}
