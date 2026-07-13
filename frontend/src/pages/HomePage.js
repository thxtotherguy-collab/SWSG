import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Settings, Droplets, ShieldCheck, Truck, Zap, Sprout, Tractor } from 'lucide-react';
import { Button } from '../components/ui/button';

const HERO_IMG = 'https://images.unsplash.com/photo-1692369584496-3216a88f94c1?w=1600&q=80';

const DIVISIONS = [
  {
    name: 'Pumps',
    icon: Droplets,
    img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80',
    desc: 'Centrifugal, submersible, borehole and pressure pumps for residential, commercial and industrial applications.',
    cta: 'Browse Pumps',
    path: '/pumps',
    accent: 'blue',
  },
  {
    name: 'Irrigation',
    icon: Sprout,
    img: 'https://images.pexels.com/photos/17765487/pexels-photo-17765487.jpeg?w=800',
    desc: 'Drip, micro, sprinkler and centre-pivot irrigation solutions for efficient water distribution.',
    cta: 'Explore Irrigation',
    path: '/irrigation',
    accent: 'green',
  },
  {
    name: 'Agriculture',
    icon: Tractor,
    img: 'https://images.unsplash.com/photo-1507064396389-c7452ac64f1c?w=800&q=80',
    desc: 'Practical water and infrastructure solutions to support your agricultural operations.',
    cta: 'Explore Agriculture',
    path: '/agriculture',
    accent: 'blue',
  },
];

export default function HomePage() {
  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[540px] flex items-center" data-testid="hero-section">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Irrigation and water solutions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(211,68%,16%)]/90 via-[hsl(211,68%,16%)]/75 to-[hsl(211,68%,16%)]/40" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <p className="text-[hsl(123,46%,64%)] font-semibold text-sm uppercase tracking-widest mb-4">Southern Water Solutions Group</p>
            <h1 className="font-manrope font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Pumps. Irrigation.<br />
              <span className="text-[hsl(123,46%,64%)]">Agriculture.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
              SWSG supplies reliable pumping and irrigation solutions to keep your property, farm and business flowing &mdash; backed by professional guidance and after-sales support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/store">
                <Button className="bg-[hsl(211,70%,39%)] hover:bg-[hsl(211,70%,32%)] text-white h-12 px-8 text-sm font-semibold rounded-sm" data-testid="hero-shop-btn">
                  Browse Pumps <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/consultation">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-sm font-semibold rounded-sm" data-testid="hero-quote-btn">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-b border-[hsl(214,32%,91%)] bg-white">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: ShieldCheck, label: 'Quality Products', sub: 'Sourced from leading brands' },
              { icon: Truck, label: 'Reliable Delivery', sub: 'Across South Africa' },
              { icon: Activity, label: 'Expert Advice', sub: 'Tailored solutions' },
              { icon: Zap, label: 'After-Sales Support', sub: 'We\'re here when you need us' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="h-6 w-6 text-[hsl(211,70%,39%)]" />
                <p className="font-manrope font-semibold text-sm text-[hsl(211,68%,16%)]">{item.label}</p>
                <p className="text-xs text-[hsl(215,16%,47%)]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Divisions */}
      <section className="py-20 bg-[hsl(210,40%,98%)]" data-testid="divisions-section">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[hsl(123,46%,34%)] font-semibold text-xs uppercase tracking-[0.2em] mb-3">Our Divisions</p>
            <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-2">Three Core Areas. One Trusted Partner.</h2>
            <p className="text-base text-[hsl(215,16%,47%)] max-w-2xl mx-auto">
              SWSG delivers integrated pump, irrigation and agricultural water solutions tailored to your requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIVISIONS.map((d) => (
              <Link
                key={d.path}
                to={d.path}
                className="group bg-white border border-[hsl(214,32%,91%)] hover:border-[hsl(211,70%,39%)] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
                data-testid={`division-card-${d.name.toLowerCase()}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(211,68%,16%)]/70 to-transparent" />
                  <div className={`absolute top-4 left-4 w-11 h-11 rounded-sm flex items-center justify-center ${d.accent === 'green' ? 'bg-[hsl(123,46%,34%)]' : 'bg-[hsl(211,70%,39%)]'}`}>
                    <d.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-manrope font-bold text-xl text-[hsl(211,68%,16%)] mb-2">{d.name}</h3>
                  <p className="text-sm text-[hsl(215,16%,47%)] leading-relaxed mb-5 flex-1">{d.desc}</p>
                  <span className={`inline-flex items-center text-sm font-semibold group-hover:gap-2 transition-all ${d.accent === 'green' ? 'text-[hsl(123,46%,34%)]' : 'text-[hsl(211,70%,39%)]'}`}>
                    {d.cta} <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-[hsl(210,40%,98%)]" data-testid="tools-section">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-2">Not sure what you need?</h2>
            <p className="text-base text-[hsl(215,16%,47%)]">Use our tools or request expert guidance from the SWSG team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/pump-finder" className="group relative overflow-hidden bg-[hsl(211,70%,39%)] text-white p-10 rounded-sm hover:shadow-xl transition-shadow" data-testid="pump-finder-card">
              <Activity className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="font-manrope font-bold text-2xl mb-2">Pump Finder</h3>
              <p className="text-white/85 mb-6 max-w-sm">Enter your flow rate and head requirements and get matched with the right pump.</p>
              <span className="inline-flex items-center font-semibold text-sm">
                Open Tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/consultation" className="group relative overflow-hidden bg-[hsl(211,68%,16%)] text-white p-10 rounded-sm hover:shadow-xl transition-shadow" data-testid="consultation-card">
              <Settings className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="font-manrope font-bold text-2xl mb-2">Book a Consultation</h3>
              <p className="text-white/85 mb-6 max-w-sm">Get expert guidance on pumps, irrigation layouts and complete water solutions.</p>
              <span className="inline-flex items-center font-semibold text-sm">
                Request Consultation <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-4">Water is Life. We Deliver Solutions.</h2>
          <p className="text-base text-[hsl(215,16%,47%)] mb-8 max-w-xl mx-auto">
            Contact SWSG to discuss your pump, irrigation or agricultural water requirements. We&apos;ll help you identify the right solution.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button className="bg-[hsl(211,70%,39%)] hover:bg-[hsl(211,70%,32%)] text-white h-12 px-8 rounded-sm" data-testid="cta-contact-btn">
                Contact SWSG
              </Button>
            </Link>
            <Link to="/store">
              <Button variant="outline" className="h-12 px-8 rounded-sm" data-testid="cta-quote-btn">
                Browse Store
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
