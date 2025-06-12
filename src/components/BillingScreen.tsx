import React, { useState } from 'react';
import { CreditCard, Download, Calendar, AlertCircle, Check, Plus } from 'lucide-react';
import { Navigation } from './Navigation';
import { PremiumBadge } from './PremiumBadge';

interface BillingScreenProps {
  onBack: () => void;
}

export const BillingScreen: React.FC<BillingScreenProps> = ({ onBack }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const paymentMethods = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiry: '08/25',
      isDefault: false,
    },
  ];

  const billingHistory = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 39.99,
      plan: 'Premium Annual',
      status: 'paid',
      invoice: 'INV-2024-001',
    },
    {
      id: '2',
      date: '2023-01-15',
      amount: 39.99,
      plan: 'Premium Annual',
      status: 'paid',
      invoice: 'INV-2023-001',
    },
    {
      id: '3',
      date: '2022-12-15',
      amount: 4.99,
      plan: 'Premium Monthly',
      status: 'paid',
      invoice: 'INV-2022-012',
    },
  ];

  const handleAddCard = () => {
    // Add payment method logic
    console.log('Add payment method:', newCard);
    setShowAddCard(false);
    setNewCard({ number: '', expiry: '', cvv: '', name: '' });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // Download invoice logic
    console.log('Download invoice:', invoiceId);
  };

  const handleCancelSubscription = () => {
    // Cancel subscription logic
    console.log('Cancel subscription');
  };

  return (
    <div className="min-h-screen bg-primary-50 animate-fade-in">
      <Navigation onBack={onBack} title="Billing & Payments" />
      
      <div className="p-6 space-y-6">
        {/* Current Subscription */}
        <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <PremiumBadge variant="crown" size="medium" />
            <h2 className="text-xl font-semibold text-warm-800">Current Subscription</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-warm-600 mb-1">Plan</p>
              <p className="font-semibold text-warm-800">Premium Annual</p>
            </div>
            <div>
              <p className="text-sm text-warm-600 mb-1">Next Billing</p>
              <p className="font-semibold text-warm-800">January 15, 2025</p>
            </div>
            <div>
              <p className="text-sm text-warm-600 mb-1">Amount</p>
              <p className="font-semibold text-warm-800">$39.99/year</p>
            </div>
            <div>
              <p className="text-sm text-warm-600 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-white hover:bg-gray-50 text-warm-700 py-3 px-4 rounded-xl font-medium transition-colors border border-primary-200">
              Change Plan
            </button>
            <button 
              onClick={handleCancelSubscription}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-3 px-4 rounded-xl font-medium transition-colors border border-red-200"
            >
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warm-800">Payment Methods</h3>
            <button
              onClick={() => setShowAddCard(true)}
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </button>
          </div>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  method.isDefault
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-warm-800">
                        •••• •••• •••• {method.last4}
                      </p>
                      <p className="text-sm text-warm-600">Expires {method.expiry}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Card Form */}
          {showAddCard && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl animate-fade-in">
              <h4 className="font-medium text-warm-800 mb-4">Add New Payment Method</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={newCard.name}
                    onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={newCard.number}
                    onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-warm-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={newCard.expiry}
                      onChange={(e) => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                      placeholder="MM/YY"
                      className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-warm-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCard}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    Add Card
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-warm-800 mb-4">Billing History</h3>
          
          <div className="space-y-3">
            {billingHistory.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-warm-800">{bill.plan}</p>
                    <p className="text-sm text-warm-600">
                      {new Date(bill.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-warm-800">${bill.amount}</p>
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 capitalize">{bill.status}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDownloadInvoice(bill.invoice)}
                    className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Download Invoice"
                  >
                    <Download className="w-4 h-4 text-primary-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Info */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Billing Information</h3>
              <div className="space-y-1 text-sm text-blue-700">
                <p>• Your subscription will automatically renew on January 15, 2025</p>
                <p>• You can cancel anytime before the renewal date</p>
                <p>• Refunds are available within 30 days of purchase</p>
                <p>• All prices include applicable taxes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};