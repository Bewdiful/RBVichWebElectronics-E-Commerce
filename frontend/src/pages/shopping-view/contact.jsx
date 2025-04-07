import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you soon.");
    if (e.target && e.target.reset) {
      e.target.reset();
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#3f2a8f] to-[#431865] min-h-screen">
      <div className="bg-gradient-to-r from-[#3f2a8f]/90 to-[#431865]/90 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">
            We're here to help. Reach out with any questions or concerns.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-[#3f2a8f]/50 rounded-xl p-6 shadow-md h-full border border-[#431865]/50">
              <h2 className="text-xl font-bold text-white mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-[#a78bfa] mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-gray-300 mt-1">support@webelectronics.com</p>
                    <p className="text-gray-300">sales@webelectronics.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-[#a78bfa] mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">Phone</h3>
                    <p className="text-gray-300 mt-1">+1 (555) 123-4567</p>
                    <p className="text-gray-300">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-[#a78bfa] mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">Address</h3>
                    <p className="text-gray-300 mt-1">
                      1234 Tech Street<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-[#a78bfa] mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">Business Hours</h3>
                    <p className="text-gray-300 mt-1">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#431865]/50">
                <h3 className="font-medium text-white mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-[#3f2a8f]/70 hover:bg-[#a78bfa] text-white p-2 rounded-full transition-colors"
                      aria-label={social}
                    >
                      <div className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#3f2a8f]/50 rounded-xl p-6 shadow-md border border-[#431865]/50">
              <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="bg-[#3f2a8f]/70 border-[#431865]/50 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="bg-[#3f2a8f]/70 border-[#431865]/50 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    className="bg-[#3f2a8f]/70 border-[#431865]/50 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your question or issue in detail..."
                    className="bg-[#3f2a8f]/70 border-[#431865]/50 text-white placeholder-gray-400 h-40"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="rounded bg-[#3f2a8f]/70 border-[#431865]/50 text-[#a78bfa] focus:ring-[#a78bfa]"
                    required
                  />
                  <label htmlFor="privacy" className="ml-2 text-sm font-medium text-gray-300">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#7c3aed] text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map (placeholder) */}
        <div className="mt-12 bg-[#3f2a8f]/50 rounded-xl p-4 h-96 flex items-center justify-center border border-[#431865]/50">
          <div className="text-center">
            <p className="text-gray-300">Interactive Map Would Go Here</p>
            <p className="text-sm text-gray-400 mt-2">
              (In a production app, this would be integrated with Google Maps or another mapping service)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;