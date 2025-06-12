import React, { useState } from 'react';
import { User, Crown, Calendar, CreditCard, Download, LogOut, Edit3, Camera } from 'lucide-react';
import { Navigation } from './Navigation';
import { PremiumBadge } from './PremiumBadge';

interface AccountScreenProps {
  onBack: () => void;
  onBilling: () => void;
  onSupport: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  onBack,
  onBilling,
  onSupport,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    profilePicture: null,
    joinDate: '2024-01-15',
    isPremium: true,
    subscriptionPlan: 'Premium Annual',
    subscriptionExpiry: '2025-01-15',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save user data logic here
  };

  const handleProfilePictureChange = () => {
    // Handle profile picture upload
    console.log('Profile picture change');
  };

  const handleExportData = () => {
    // Handle data export
    console.log('Export cooking data');
  };

  const handleLogout = () => {
    // Handle logout
    console.log('Logout');
  };

  return (
    <div className="min-h-screen bg-primary-50 animate-fade-in">
      <Navigation onBack={onBack} title="Account" />
      
      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                {userData.profilePicture ? (
                  <img 
                    src={userData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              <button
                onClick={handleProfilePictureChange}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold text-warm-800">{userData.name}</h2>
                {userData.isPremium && <PremiumBadge variant="crown" size="small" />}
              </div>
              <p className="text-warm-600">{userData.email}</p>
              <p className="text-sm text-warm-500">
                Member since {new Date(userData.joinDate).toLocaleDateString()}
              </p>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <Edit3 className="w-5 h-5 text-primary-600" />
            </button>
          </div>

          {isEditing && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Subscription Status */}
        {userData.isPremium && (
          <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-accent-600" />
              <h3 className="text-lg font-semibold text-warm-800">Premium Subscription</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-warm-600 mb-1">Current Plan</p>
                <p className="font-medium text-warm-800">{userData.subscriptionPlan}</p>
              </div>
              <div>
                <p className="text-sm text-warm-600 mb-1">Renewal Date</p>
                <p className="font-medium text-warm-800">
                  {new Date(userData.subscriptionExpiry).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <button
              onClick={onBilling}
              className="w-full bg-white hover:bg-gray-50 text-warm-700 py-3 px-4 rounded-xl font-medium transition-colors border border-primary-200 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Manage Billing
            </button>
          </div>
        )}

        {/* Account Actions */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-warm-800 mb-4">Account Actions</h3>
          
          <div className="space-y-3">
            <button
              onClick={onBilling}
              className="w-full flex items-center gap-3 p-4 hover:bg-primary-50 rounded-xl transition-colors text-left"
            >
              <CreditCard className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-warm-800">Billing & Payments</p>
                <p className="text-sm text-warm-600">Manage payment methods and billing history</p>
              </div>
            </button>
            
            <button
              onClick={handleExportData}
              className="w-full flex items-center gap-3 p-4 hover:bg-primary-50 rounded-xl transition-colors text-left"
            >
              <Download className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-warm-800">Export Cooking Data</p>
                <p className="text-sm text-warm-600">Download your favorites and cooking history</p>
              </div>
            </button>
            
            <button
              onClick={onSupport}
              className="w-full flex items-center gap-3 p-4 hover:bg-primary-50 rounded-xl transition-colors text-left"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="text-primary-600">🎧</span>
              </div>
              <div>
                <p className="font-medium text-warm-800">Premium Support</p>
                <p className="text-sm text-warm-600">Get help from our cooking experts</p>
              </div>
            </button>
          </div>
        </div>

        {/* Cooking Stats */}
        <div className="bg-white rounded-2xl p-6 border border-primary-200 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-semibold text-warm-800 mb-4">Your Cooking Journey</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary-50 rounded-xl">
              <div className="text-2xl font-bold text-primary-600 mb-1">127</div>
              <div className="text-sm text-warm-600">Dishes Cooked</div>
            </div>
            <div className="text-center p-4 bg-accent-50 rounded-xl">
              <div className="text-2xl font-bold text-accent-600 mb-1">23</div>
              <div className="text-sm text-warm-600">Favorites Saved</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-1">45h</div>
              <div className="text-sm text-warm-600">Time Saved</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
              <div className="text-sm text-warm-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors border border-red-200"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};