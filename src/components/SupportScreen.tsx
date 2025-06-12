import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Book, Star, Send, Clock } from 'lucide-react';
import { Navigation } from './Navigation';
import { PremiumBadge } from './PremiumBadge';

interface SupportScreenProps {
  onBack: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');

  const supportCategories = [
    { id: 'cooking', name: 'Cooking Questions', icon: '👨‍🍳' },
    { id: 'technical', name: 'Technical Issues', icon: '🔧' },
    { id: 'billing', name: 'Billing & Account', icon: '💳' },
    { id: 'features', name: 'Feature Requests', icon: '💡' },
  ];

  const faqItems = [
    {
      question: 'How accurate are the cooking times?',
      answer: 'Our cooking times are scientifically validated and based on USDA guidelines. They include safety margins and are accurate within 95% for standard conditions.',
    },
    {
      question: 'Can I use the app offline?',
      answer: 'Yes! Once you\'ve loaded the app, basic timer functionality works offline. Premium features like AI recognition require an internet connection.',
    },
    {
      question: 'How do I calibrate for my specific equipment?',
      answer: 'Premium users can access equipment calibration in Settings. You can adjust for oven temperature variations, altitude, and cooking surface differences.',
    },
    {
      question: 'What if my food isn\'t cooking as expected?',
      answer: 'Check your equipment temperature, food thickness, and starting temperature. Our premium support team can provide personalized cooking advice.',
    },
  ];

  const handleSubmitTicket = () => {
    // Submit support ticket logic
    console.log('Submit ticket:', { category: selectedCategory, message, priority });
    setMessage('');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-primary-50 animate-fade-in">
      <Navigation onBack={onBack} title="Premium Support" />
      
      <div className="p-6 space-y-6">
        {/* Premium Support Header */}
        <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <PremiumBadge variant="crown" size="medium" />
            <h2 className="text-xl font-semibold text-warm-800">Premium Support</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-xl">
              <Clock className="w-6 h-6 text-accent-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-warm-800">Response Time</p>
              <p className="text-xs text-warm-600">Within 2 hours</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl">
              <Star className="w-6 h-6 text-accent-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-warm-800">Expert Help</p>
              <p className="text-xs text-warm-600">Cooking specialists</p>
            </div>
          </div>
          
          <p className="text-sm text-warm-600">
            Get personalized help from our team of cooking experts and technical specialists.
          </p>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-semibold text-warm-800 mb-4">Contact Options</h3>
          
          <div className="grid gap-3">
            <button className="flex items-center gap-4 p-4 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors text-left">
              <MessageCircle className="w-6 h-6 text-primary-600" />
              <div>
                <p className="font-medium text-warm-800">Live Chat</p>
                <p className="text-sm text-warm-600">Available 24/7 for premium users</p>
              </div>
            </button>
            
            <button className="flex items-center gap-4 p-4 bg-accent-50 hover:bg-accent-100 rounded-xl transition-colors text-left">
              <Phone className="w-6 h-6 text-accent-600" />
              <div>
                <p className="font-medium text-warm-800">Phone Support</p>
                <p className="text-sm text-warm-600">Call us at +1 (555) 123-4567</p>
              </div>
            </button>
            
            <button className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-warm-800">Email Support</p>
                <p className="text-sm text-warm-600">premium@smartfoodtimer.com</p>
              </div>
            </button>
          </div>
        </div>

        {/* Submit Ticket */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-warm-800 mb-4">Submit Support Ticket</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-warm-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              >
                <option value="low">Low - General question</option>
                <option value="medium">Medium - Need help</option>
                <option value="high">High - Urgent issue</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">
                Describe your issue
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide as much detail as possible about your cooking question or technical issue..."
                rows={4}
                className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent resize-none"
              />
            </div>
            
            <button
              onClick={handleSubmitTicket}
              disabled={!selectedCategory || !message.trim()}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Ticket
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Book className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-warm-800">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-xl overflow-hidden"
              >
                <summary className="p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-warm-800">{item.question}</span>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-warm-600 leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-semibold text-blue-800 mb-3">📚 Knowledge Base</h3>
          <p className="text-sm text-blue-700 mb-4">
            Explore our comprehensive guides and tutorials for perfect cooking results.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white hover:bg-blue-50 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
              Cooking Guides
            </button>
            <button className="bg-white hover:bg-blue-50 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
              Video Tutorials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};