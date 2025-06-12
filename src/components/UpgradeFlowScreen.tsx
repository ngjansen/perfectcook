import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Crown, CreditCard, Shield, Star } from 'lucide-react';
import { subscriptionPlans } from '../data/premiumFeatures';

interface UpgradeFlowScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export const UpgradeFlowScreen: React.FC<UpgradeFlowScreenProps> = ({
  onBack,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
  });

  const steps = [
    { id: 1, title: 'Choose Plan', description: 'Select your subscription' },
    { id: 2, title: 'Account', description: 'Create your account' },
    { id: 3, title: 'Payment', description: 'Enter payment details' },
    { id: 4, title: 'Confirmation', description: 'Welcome to Premium!' },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const selectedPlanData = subscriptionPlans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-primary-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-primary-100">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full hover:bg-primary-50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-primary-600" />
        </button>
        
        <h1 className="text-lg font-semibold text-warm-800">
          Upgrade to Premium
        </h1>
        
        <div className="w-10 h-10" />
      </div>

      {/* Progress Steps */}
      <div className="p-6 bg-white border-b border-primary-100">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                currentStep >= step.id
                  ? 'bg-accent-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-1 mx-2 transition-all ${
                  currentStep > step.id ? 'bg-accent-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <h2 className="font-semibold text-warm-800">{steps[currentStep - 1].title}</h2>
          <p className="text-sm text-warm-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Plan Selection */}
        {currentStep === 1 && (
          <div className="max-w-md mx-auto space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <Crown className="w-12 h-12 text-accent-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-warm-900 mb-2">
                Choose Your Plan
              </h2>
              <p className="text-warm-600">
                Select the perfect plan for your cooking journey
              </p>
            </div>

            <div className="space-y-4">
              {subscriptionPlans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? 'border-accent-500 bg-accent-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-accent-300'
                  } ${plan.popular ? 'ring-2 ring-accent-200' : ''}`}
                >
                  {plan.popular && (
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-accent-500 fill-current" />
                      <span className="text-sm font-medium text-accent-600">Most Popular</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-warm-800">{plan.name}</h3>
                    {plan.savings && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {plan.savings}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-warm-900">${plan.price}</span>
                    <span className="text-warm-600">/{plan.period}</span>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-warm-600">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <div className="text-sm text-warm-500">
                        +{plan.features.length - 4} more features
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Account Creation */}
        {currentStep === 2 && (
          <div className="max-w-md mx-auto space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold text-warm-900 mb-2">
                Create Your Account
              </h2>
              <p className="text-warm-600">
                Set up your premium cooking profile
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={accountData.name}
                  onChange={(e) => setAccountData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="w-full p-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="w-full p-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={accountData.password}
                  onChange={(e) => setAccountData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a secure password"
                  className="w-full p-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Secure & Private</h3>
                  <p className="text-sm text-blue-700">
                    Your data is encrypted and never shared with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {currentStep === 3 && (
          <div className="max-w-md mx-auto space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <CreditCard className="w-12 h-12 text-accent-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-warm-900 mb-2">
                Payment Details
              </h2>
              <p className="text-warm-600">
                Secure payment processing
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl p-4 border border-primary-200">
              <h3 className="font-semibold text-warm-800 mb-3">Order Summary</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-warm-600">{selectedPlanData?.name}</span>
                <span className="font-medium text-warm-800">${selectedPlanData?.price}</span>
              </div>
              {selectedPlanData?.savings && (
                <div className="text-sm text-green-600 mb-2">
                  {selectedPlanData.savings} compared to monthly
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-3">
                <div className="flex items-center justify-between font-semibold text-warm-800">
                  <span>Total</span>
                  <span>${selectedPlanData?.price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    placeholder="MM/YY"
                    className="w-full p-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                    placeholder="123"
                    className="w-full p-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-800 mb-1">Secure Payment</h3>
                  <p className="text-sm text-green-700">
                    256-bit SSL encryption • PCI DSS compliant
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-warm-900 mb-3">
                Welcome to Premium! 🎉
              </h2>
              <p className="text-warm-600 mb-6">
                Your premium features are now active. Start exploring advanced cooking capabilities!
              </p>
            </div>

            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-6 border border-accent-200">
              <h3 className="font-semibold text-warm-800 mb-3">What's Next?</h3>
              <div className="space-y-2 text-sm text-warm-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Access 100+ premium foods
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Try AI food recognition
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Set up equipment calibration
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Create unlimited multi-timers
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-700">
                📧 Confirmation email sent to {accountData.email}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 max-w-md mx-auto">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-medium transition-all duration-200"
            >
              Previous
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {currentStep === 4 ? 'Start Cooking' : 'Continue'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};