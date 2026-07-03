import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Activity, Droplets, Zap, Container, Settings, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HERO_IMG = 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&q=80';

const categoryTiles = [
  { name: 'Borehole Pumps', slug: 'Borehole Pump', icon: Activity, desc: 'Deep well groundwater extraction' },
  { name: 'Submersible Pumps', slug: 'Submersible Pump', icon: Droplets, desc: 'Drainage, wells & feature pumps' },
  { name: 'Centrifugal Pumps', slug: 'Centrifugal Pump', icon: Zap, desc: 'High-flow transfer & irrigation' },
  { name: 'Multistage Pumps', slug: 'Vertical Multistage Pump', icon: Container, desc: 'Pressure boosting for multi-storey and commercial systems' },
  { name: 'End Suction Pumps', slug: 'End Suction Pump', icon: Settings, desc: 'General-purpose water transfer' },
  { name: 'Self-Priming Pumps', slug: 'Self-Priming Pump', icon: Droplets, desc: 'Surface pumps with automatic priming' },
];

export default function PumpsPage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API}/products?featured=true&limit=8`);
        setFeatured(res.data);
      } catch (err) {
        console.error('Failed to load featured pumps', err);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white" data-testid="pumps-page">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[hsl(214,32%,91%)]">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-2 text-sm text-[hsl(215,16%,47%)]">
          <Link to="/" className="hover:text-[hsl(211,70%,39%)]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[hsl(211,68%,16%)] font-medium">Pumps</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-center" data-testid="pumps-hero">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Industrial water pumps" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[hsl(211,68%,16%)]/80" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <p className="text-[hsl(123,46%,54%)] font-semibold text-sm uppercase tracking-widest mb-4">SWSG &bull; Pumps Division</p>
            <h1 className="font-manrope font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6">
              Reliable Pumps.<br />Built to Perform.
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
              SWSG supplies and supports a wide range of centrifugal, submersible, borehole and pressure pumps for residential, commercial, agricultural and industrial applications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/store">
                <Button className="bg-[hsl(211,70%,39%)] hover:bg-[hsl(211,70%,32%)] text-white h-12 px-8 text-sm font-semibold rounded-sm" data-testid="pumps-store-btn">
                  Browse Full Catalogue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/consultation">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-sm font-semibold rounded-sm">
                  Get Expert Advice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[hsl(210,40%,98%)]" data-testid="pumps-categories">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-2">Pump Categories</h2>
            <p className="text-base text-[hsl(215,16%,47%)]">Choose a category to view products in our online store.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTiles.map(cat => (
              <Link
                key={cat.slug}
                to={`/store?category=${cat.slug}`}
                className="group bg-white border border-[hsl(214,32%,91%)] hover:border-[hsl(211,70%,39%)] p-8 rounded-sm transition-all duration-300 hover:shadow-lg"
                data-testid={`pump-cat-${cat.slug}`}
              >
                <cat.icon className="h-10 w-10 text-[hsl(211,70%,39%)] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-manrope font-bold text-lg text-[hsl(211,68%,16%)] mb-1">{cat.name}</h3>
                <p className="text-sm text-[hsl(215,16%,47%)] mb-4">{cat.desc}</p>
                <span className="inline-flex items-center text-sm font-medium text-[hsl(211,70%,39%)] group-hover:gap-2 transition-all">
                  View products <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-white" data-testid="pumps-featured">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-[hsl(211,68%,16%)] mb-2">Featured Pumps</h2>
              <p className="text-base text-[hsl(215,16%,47%)]">Popular products from our catalogue.</p>
            </div>
            <Link to="/store" className="hidden sm:inline-flex items-center text-sm font-medium text-[hsl(211,70%,39%)] hover:underline">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-[hsl(210,40%,96%)] animate-pulse rounded-sm h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[hsl(211,70%,39%)]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-[hsl(123,46%,64%)]" />
          <h2 className="font-manrope font-bold text-2xl sm:text-3xl text-white mb-4">Not sure which pump you need?</h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto">
            Send us your requirements and our team will recommend a pump matched to your flow, head and site conditions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/consultation">
              <Button className="bg-white text-[hsl(211,70%,39%)] hover:bg-gray-100 h-12 px-8 rounded-sm font-semibold">
                Book a Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 h-12 px-8 rounded-sm font-semibold">
                Contact SWSG
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
