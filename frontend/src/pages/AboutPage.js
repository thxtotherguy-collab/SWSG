import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Users, Truck, ArrowRight, Droplets, Sprout, Tractor } from 'lucide-react';
import { Button } from '../components/ui/button';

const LOGO_SRC = '/images/brand/swsg-logo.png';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="about-page">
      <div className="bg-white border-b border-[hsl(214,32%,91%)]">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-2 text-sm text-[hsl(215,16%,47%)]">
          <Link to="/" className="hover:text-[hsl(211,70%,39%)]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[hsl(211,68%,16%)] font-medium">About</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[hsl(210,40%,98%)] py-20">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="max-w-2xl">
            <img src={LOGO_SRC} alt="SWSG — Southern Water Solutions Group" className="h-24 sm:h-28 w-auto object-contain mb-6" />
            <p className="text-[hsl(123,46%,34%)] font-semibold text-xs uppercase tracking-widest mb-3">About Us</p>
            <h1 className="font-manrope font-bold text-3xl sm:text-4xl text-[hsl(211,68%,16%)] mb-6">
              Southern Water Solutions Group
            </h1>
            <p className="text-base text-[hsl(215,16%,47%)] leading-relaxed mb-4">
              Southern Water Solutions Group (SWSG) provides practical pump, irrigation and agricultural solutions for customers with a range of water and operational requirements.
            </p>
            <p className="text-base text-[hsl(215,16%,47%)] leading-relaxed">
              SWSG combines suitable products with professional guidance, helping customers identify solutions that fit their specific applications &mdash; from residential systems to commercial and agricultural installations.
            </p>
          </div>
        </div>
      </section>

      {/* Divisions summary */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-12 text-center">Our Three Divisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Droplets, title: 'Pumps', desc: 'Centrifugal, submersible, borehole and pressure pumps supported by expert product advice.', path: '/pumps' },
              { icon: Sprout, title: 'Irrigation', desc: 'Drip, sprinkler and centre-pivot irrigation guidance and component supply.', path: '/irrigation' },
              { icon: Tractor, title: 'Agriculture', desc: 'Water and infrastructure support for small holdings, commercial farms and agri operations.', path: '/agriculture' },
            ].map((item, i) => (
              <Link key={i} to={item.path} className="group bg-white border border-[hsl(214,32%,91%)] hover:border-[hsl(211,70%,39%)] p-8 rounded-sm transition-all text-center">
                <div className="w-14 h-14 bg-[hsl(211,70%,39%)]/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-[hsl(211,70%,39%)]" />
                </div>
                <h3 className="font-manrope font-bold text-lg text-[hsl(211,68%,16%)] mb-2">{item.title}</h3>
                <p className="text-sm text-[hsl(215,16%,47%)] leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[hsl(210,40%,98%)]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-12 text-center">Why Choose SWSG?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'Quality Products', desc: 'We source pump and irrigation products from established manufacturers to help ensure durable, reliable performance in South African conditions.' },
              { icon: Users, title: 'Professional Guidance', desc: 'Our team provides tailored guidance on pump selection, irrigation layouts and agricultural water systems &mdash; matched to your specific application.' },
              { icon: Truck, title: 'Practical Support', desc: 'From product selection through after-sales support, SWSG helps customers with the practical decisions that keep their systems running.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white border border-[hsl(214,32%,91%)] rounded-sm flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-8 w-8 text-[hsl(211,70%,39%)]" />
                </div>
                <h3 className="font-manrope font-bold text-lg text-[hsl(211,68%,16%)] mb-3">{item.title}</h3>
                <p className="text-sm text-[hsl(215,16%,47%)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[hsl(211,70%,39%)]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-white mb-4">Ready to Find Your Solution?</h2>
          <p className="text-white/85 mb-8 max-w-lg mx-auto">Browse our catalogue or reach out for a consultation on your specific requirements.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/store">
              <Button className="bg-white text-[hsl(211,70%,39%)] hover:bg-gray-100 h-12 px-8 rounded-sm font-semibold" data-testid="about-shop-btn">
                Visit Store <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 rounded-sm font-semibold" data-testid="about-contact-btn">
                Contact SWSG
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
