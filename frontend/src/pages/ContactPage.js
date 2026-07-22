import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import {
  buildContactMessage,
  STATIC_FORM_FALLBACK,
  STATIC_FORM_SUBJECTS,
  submitStaticForm,
} from '../config/staticForms';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const result = await submitStaticForm({
        formType: 'Contact Message',
        subject: STATIC_FORM_SUBJECTS.contact,
        fields: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          customer_subject: form.subject,
          original_message: form.message,
          message: buildContactMessage(form),
        },
      });

      if (!result.success) {
        toast.error('Message could not be sent.', {
          description: `${result.message} ${STATIC_FORM_FALLBACK}`,
        });
        return;
      }

      toast.success('Message sent! Our team will get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(210,40%,98%)]" data-testid="contact-page">
      <div className="bg-white border-b border-[hsl(214,32%,91%)]">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-2 text-sm text-[hsl(215,16%,47%)]">
          <Link to="/" className="hover:text-[hsl(211,70%,39%)]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[hsl(211,68%,16%)] font-medium">Contact</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-[hsl(123,46%,34%)] font-semibold text-xs uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="font-manrope font-bold text-3xl sm:text-4xl text-[hsl(211,68%,16%)] mb-3">Contact SWSG</h1>
          <p className="text-base text-[hsl(215,16%,47%)] max-w-lg mx-auto">
            Need advice on pumps, irrigation or agricultural water solutions? Send us your requirements and our team will assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-6">
            <a href="tel:+27814177689" className="block bg-white border border-[hsl(214,32%,91%)] rounded-sm p-5 flex gap-4 hover:border-[hsl(211,70%,39%)] transition-colors" data-testid="contact-phone-link">
              <div className="w-10 h-10 bg-[hsl(211,70%,39%)]/10 rounded-sm flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-[hsl(211,70%,39%)]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[hsl(211,68%,16%)]">Phone</p>
                <p className="text-sm text-[hsl(211,68%,16%)]">+27 81 417 7689</p>
                <p className="text-xs text-[hsl(215,16%,47%)]">Mon-Fri, 8am-5pm SAST</p>
              </div>
            </a>
            <a href="mailto:info@swsg.co.za" className="block bg-white border border-[hsl(214,32%,91%)] rounded-sm p-5 flex gap-4 hover:border-[hsl(211,70%,39%)] transition-colors" data-testid="contact-email-link">
              <div className="w-10 h-10 bg-[hsl(123,46%,34%)]/10 rounded-sm flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-[hsl(123,46%,34%)]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[hsl(211,68%,16%)]">Email</p>
                <p className="text-sm text-[hsl(211,68%,16%)]">info@swsg.co.za</p>
                <p className="text-xs text-[hsl(215,16%,47%)]">Response within 24 hours</p>
              </div>
            </a>
            <div className="bg-white border border-[hsl(214,32%,91%)] rounded-sm p-5 flex gap-4">
              <div className="w-10 h-10 bg-[hsl(211,70%,39%)]/10 rounded-sm flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-[hsl(211,70%,39%)]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[hsl(211,68%,16%)]">Location</p>
                <p className="text-sm text-[hsl(211,68%,16%)]">South Africa</p>
                <p className="text-xs text-[hsl(215,16%,47%)]">Nationwide service</p>
              </div>
            </div>
            <div className="bg-[hsl(211,68%,16%)] rounded-sm p-5 text-white">
              <p className="font-semibold text-sm mb-2">Water is Life.</p>
              <p className="text-sm text-gray-300">We deliver solutions across pumps, irrigation and agriculture.</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 bg-white border border-[hsl(214,32%,91%)] rounded-sm p-8">
            <h2 className="font-manrope font-bold text-xl text-[hsl(211,68%,16%)] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text" placeholder="Full Name *" required
                  value={form.name} onChange={(e) => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full h-11 px-3 border border-[hsl(214,32%,91%)] rounded-sm text-sm outline-none focus:ring-2 focus:ring-[hsl(211,70%,39%)]"
                  data-testid="contact-name"
                />
                <input
                  type="email" placeholder="Email *" required
                  value={form.email} onChange={(e) => setForm(f => ({...f, email: e.target.value}))}
                  className="w-full h-11 px-3 border border-[hsl(214,32%,91%)] rounded-sm text-sm outline-none focus:ring-2 focus:ring-[hsl(211,70%,39%)]"
                  data-testid="contact-email"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel" placeholder="Phone"
                  value={form.phone} onChange={(e) => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-11 px-3 border border-[hsl(214,32%,91%)] rounded-sm text-sm outline-none focus:ring-2 focus:ring-[hsl(211,70%,39%)]"
                  data-testid="contact-phone"
                />
                <input
                  type="text" placeholder="Subject"
                  value={form.subject} onChange={(e) => setForm(f => ({...f, subject: e.target.value}))}
                  className="w-full h-11 px-3 border border-[hsl(214,32%,91%)] rounded-sm text-sm outline-none focus:ring-2 focus:ring-[hsl(211,70%,39%)]"
                  data-testid="contact-subject"
                />
              </div>
              <textarea
                placeholder="Your message — include details like application (pumps, irrigation, agriculture), water source, distances, pipe sizes, etc. *" required
                value={form.message} onChange={(e) => setForm(f => ({...f, message: e.target.value}))}
                className="w-full px-3 py-2 border border-[hsl(214,32%,91%)] rounded-sm text-sm outline-none focus:ring-2 focus:ring-[hsl(211,70%,39%)] h-32 resize-none"
                data-testid="contact-message"
              />
              <Button type="submit" disabled={sending} className="h-11 px-8 bg-[hsl(211,70%,39%)] hover:bg-[hsl(211,70%,32%)] text-white rounded-sm font-semibold" data-testid="contact-submit">
                <Send className="h-4 w-4 mr-2" /> {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
