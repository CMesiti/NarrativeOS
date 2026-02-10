import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Campaign } from '@/app/data/mockData';
import { Users, Calendar } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  userRole: 'dm' | 'player';
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, userRole }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/campaign/${campaign.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription className="mt-2">{campaign.description}</CardDescription>
          </div>
          <Badge variant={userRole === 'dm' ? 'default' : 'secondary'}>
            {userRole === 'dm' ? 'DM' : 'Player'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{campaign.users.length} members</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(campaign.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
