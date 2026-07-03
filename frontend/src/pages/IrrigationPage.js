import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Droplets, Sprout, Settings, CheckCircle2, Filter, Waves } from 'lucide-react';
import { Button } from '../components/ui/button';

const HERO_IMG = 'https://images.unsplash.com/photo-1692369584496-3216a88f94c1?w=1600&q=80';
const GALLERY = [
  { src: 'https://images.pexels.com/photos/10606633/pexels-photo-10606633.jpeg?w=800', alt: 'Drip irrigation lines' },
  { src: 'https://images.pexels.com/photos/17765487/pexels-photo-17765487.jpeg?w=800', alt: 'Sprinkler irrigation on crops' },
  { src: 'https://images.unsplash.com/photo-1619719826894-89d6c4fd5739?w=800&q=80', alt: 'Centre pivot irrigation' },
];

const SOLUTIONS = [
  { icon: Droplets, title: 'Drip &amp; Micro Irrigation', desc: 'Efficient, low-flow water distribution for orchards, greenhouses and row crops.' },
  { icon: Sprout, title: 'Sprinkler Systems', desc: 'Impact and rotor sprinklers for pastures, sports fields and general irrigation.' },
  { icon: Waves, title: 'Centre Pivot &amp; Move Systems', desc: 'Large-scale mechanised irrigation for row crop farming.' },
  { icon: Filter, title: 'Filtration Solutions', desc: 'Disc, screen, sand media and automatic filter stations for reliable operation.' },
  { icon: Settings, title: 'Controllers &amp; Automation', desc: 'Timers, sensors and automation to save water and labour.' },
];

export default function IrrigationPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="irrigation-page">
      <div className="bg-white border-b border-[hsl(214,32%,91%)]">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-2 text-sm text-[hsl(215,16%,47%)]">
          <Link to="/" className="hover:text-[hsl(211,70%,39%)]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[hsl(211,68%,16%)] font-medium">Irrigation</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-center" data-testid="irrigation-hero">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Centre pivot irrigation on crop field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[hsl(211,68%,16%)]/70" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <p className="text-[hsl(123,46%,54%)] font-semibold text-sm uppercase tracking-widest mb-4">SWSG &bull; Irrigation Division</p>
            <h1 className="font-manrope font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6">
              Smart Irrigation.<br />Stronger Yields.
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
              Practical irrigation solutions designed to support efficient water distribution for residential, commercial and agricultural environments.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/consultation">
                <Button className="bg-[hsl(123,46%,34%)] hover:bg-[hsl(123,46%,28%)] text-white h-12 px-8 text-sm font-semibold rounded-sm" data-testid="irrigation-consult-btn">
                  Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-sm font-semibold rounded-sm">
                  Contact SWSG
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-6">Irrigation Solutions</h2>
            <p className="text-base text-[hsl(215,16%,47%)] leading-relaxed mb-4">
              SWSG helps customers identify suitable irrigation options based on property size, water source and intended application &mdash; from small residential systems to larger agricultural installations.
            </p>
            <p className="text-base text-[hsl(215,16%,47%)] leading-relaxed mb-6">
              Our team can advise on system layout, component selection, and pump-to-zone matching, and can supply the associated pipes, fittings and filtration equipment through our pump catalogue and network of suppliers.
            </p>
            <ul className="space-y-2.5">
              {['Water source and pressure assessment','Layout and zoning guidance','Component and pipe sizing','Filtration and controller selection','Integration with pump systems'].map((item,i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[hsl(123,46%,34%)] mt-0.5 shrink-0" />
                  <span className="text-sm text-[hsl(211,68%,16%)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {GALLERY.map((g, i) => (
              <img key={i} src={g.src} alt={g.alt} className={`w-full object-cover rounded-sm ${i === 0 ? 'col-span-2 h-56' : 'h-40'}`} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-20 bg-[hsl(210,40%,98%)]" data-testid="irrigation-solutions">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-3">What We Support</h2>
          <p className="text-base text-[hsl(215,16%,47%)] mb-12 max-w-2xl">
            Guidance and product supply across the core areas of modern irrigation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="bg-white border border-[hsl(214,32%,91%)] p-6 rounded-sm hover:border-[hsl(211,70%,39%)] transition-colors" data-testid={`irrigation-solution-${i}`}>
                <div className="w-12 h-12 bg-[hsl(211,70%,39%)]/10 rounded-sm flex items-center justify-center mb-4">
                  <s.icon className="h-6 w-6 text-[hsl(211,70%,39%)]" />
                </div>
                <h3 className="font-manrope font-bold text-lg text-[hsl(211,68%,16%)] mb-2" dangerouslySetInnerHTML={{__html: s.title}} />
                <p className="text-sm text-[hsl(215,16%,47%)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[hsl(211,68%,16%)]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-white mb-4">Plan Your Irrigation with SWSG</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Share your property details, water source and crop or landscape type &mdash; we&apos;ll recommend suitable equipment and layout options.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/consultation">
              <Button className="bg-[hsl(123,46%,34%)] hover:bg-[hsl(123,46%,28%)] text-white h-12 px-8 rounded-sm font-semibold">
                Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 rounded-sm font-semibold">
                Contact SWSG
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
