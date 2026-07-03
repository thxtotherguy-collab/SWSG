import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Tractor, Sprout, Droplets, CheckCircle2, Wrench, Sun } from 'lucide-react';
import { Button } from '../components/ui/button';

const HERO_IMG = 'https://images.unsplash.com/photo-1507064396389-c7452ac64f1c?w=1600&q=80';
const GALLERY = [
  { src: 'https://images.pexels.com/photos/34732063/pexels-photo-34732063.jpeg?w=800', alt: 'Agricultural crop field' },
  { src: 'https://images.unsplash.com/photo-1689349483530-bb7a0734d9fb?w=800&q=80', alt: 'Farm with irrigation infrastructure' },
  { src: 'https://images.unsplash.com/photo-1508175688576-0c076b47b5b5?w=800&q=80', alt: 'Large scale farming' },
];

const OFFERINGS = [
  { icon: Droplets, title: 'Water Supply Systems', desc: 'Borehole pumps, dam and river abstraction pumps, and pressure boosting for farm operations.' },
  { icon: Sprout, title: 'Irrigation Infrastructure', desc: 'Drip, sprinkler and centre pivot components sized to crop, terrain and water source.' },
  { icon: Tractor, title: 'Farm Utility Solutions', desc: 'Pipes, fittings, valves and connectors for reliable on-farm plumbing and water routing.' },
  { icon: Sun, title: 'Off-Grid &amp; Solar Options', desc: 'Guidance on solar-compatible pumps and off-grid water supply setups.' },
  { icon: Wrench, title: 'After-Sales Support', desc: 'Advice on maintenance, replacements and system upgrades as your operation grows.' },
];

export default function AgriculturePage() {
  return (
    <div className="min-h-screen bg-white" data-testid="agriculture-page">
      <div className="bg-white border-b border-[hsl(214,32%,91%)]">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-2 text-sm text-[hsl(215,16%,47%)]">
          <Link to="/" className="hover:text-[hsl(211,70%,39%)]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[hsl(211,68%,16%)] font-medium">Agriculture</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-center" data-testid="agriculture-hero">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Agricultural landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[hsl(211,68%,16%)]/75" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <p className="text-[hsl(123,46%,54%)] font-semibold text-sm uppercase tracking-widest mb-4">SWSG &bull; Agriculture Division</p>
            <h1 className="font-manrope font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6">
              Water Solutions for Agriculture.
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
              SWSG supports agricultural water and infrastructure requirements by helping customers identify practical solutions for their operations &mdash; from small holdings to commercial farms.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/consultation">
                <Button className="bg-[hsl(123,46%,34%)] hover:bg-[hsl(123,46%,28%)] text-white h-12 px-8 text-sm font-semibold rounded-sm" data-testid="agriculture-consult-btn">
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
            <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-6">Supporting South African Agriculture</h2>
            <p className="text-base text-[hsl(215,16%,47%)] leading-relaxed mb-4">
              Customers can contact SWSG for guidance and consultation based on their specific water, pump, irrigation or agricultural requirements. We aim to provide practical, honest recommendations tailored to your operation.
            </p>
            <p className="text-base text-[hsl(215,16%,47%)] leading-relaxed mb-6">
              Whether you are setting up a new borehole, planning an irrigation upgrade, or replacing tired equipment, our team can help you identify suitable products and system configurations.
            </p>
            <ul className="space-y-2.5">
              {['Practical, honest technical guidance','Support for small holdings and commercial farms','Pump and irrigation system integration','Access to reliable pump catalogue','After-sales support and advice'].map((item,i) => (
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

      {/* Offerings */}
      <section className="py-20 bg-[hsl(210,40%,98%)]" data-testid="agriculture-offerings">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-3">What We Offer</h2>
          <p className="text-base text-[hsl(215,16%,47%)] mb-12 max-w-2xl">
            Focused on the practical infrastructure agricultural customers rely on every day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERINGS.map((s, i) => (
              <div key={i} className="bg-white border border-[hsl(214,32%,91%)] p-6 rounded-sm hover:border-[hsl(211,70%,39%)] transition-colors" data-testid={`agriculture-offering-${i}`}>
                <div className="w-12 h-12 bg-[hsl(123,46%,34%)]/10 rounded-sm flex items-center justify-center mb-4">
                  <s.icon className="h-6 w-6 text-[hsl(123,46%,34%)]" />
                </div>
                <h3 className="font-manrope font-bold text-lg text-[hsl(211,68%,16%)] mb-2" dangerouslySetInnerHTML={{__html: s.title}} />
                <p className="text-sm text-[hsl(215,16%,47%)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[hsl(211,70%,39%)]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-white mb-4">Let&apos;s Grow Together</h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto">
            Get the right pump and irrigation solutions to save water, boost efficiency and support your operation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/consultation">
              <Button className="bg-white text-[hsl(211,70%,39%)] hover:bg-gray-100 h-12 px-8 rounded-sm font-semibold">
                Book a Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 h-12 px-8 rounded-sm font-semibold">
                Contact SWSG <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
