import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { mockCampaigns } from '@/app/data/mockData';
import { CampaignCard } from '@/app/components/CampaignCard';
import { Button } from '@/app/components/ui/button';
import { Sword, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get campaigns where the user is enrolled
  const userCampaigns = mockCampaigns.filter(campaign =>
    campaign.users.some(u => u.userId === user?.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sword className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">NarrativeOS</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-purple-200">Welcome, {user?.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Your Campaigns</h2>
          <p className="text-purple-200">Select a campaign to continue your adventure</p>
        </div>

        {userCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-purple-200 text-lg mb-4">You're not enrolled in any campaigns yet</p>
            <p className="text-purple-300 text-sm">Contact your Dungeon Master to join a campaign</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userCampaigns.map(campaign => {
              const userInCampaign = campaign.users.find(u => u.userId === user?.id);
              return (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  userRole={userInCampaign?.role || 'player'}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
