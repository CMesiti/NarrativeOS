import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { mockCampaigns, mockCharacters } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { ArrowLeft, Send, Users, Sparkles } from 'lucide-react';

export const CampaignPage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; sender: string; isAI?: boolean }>>([
    { text: 'Welcome to the campaign! How can I assist you today?', sender: 'AI Assistant', isAI: true }
  ]);

  const campaign = mockCampaigns.find(c => c.id === campaignId);
  const userInCampaign = campaign?.users.find(u => u.userId === user?.id);
  const isDM = userInCampaign?.role === 'dm';

  // Get character for player view
  const playerCharacter = !isDM && userInCampaign?.characterId
    ? mockCharacters.find(c => c.id === userInCampaign.characterId)
    : null;

  if (!campaign || !userInCampaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Campaign not found</h2>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage,
      sender: user?.username || 'User',
      isAI: false
    };

    setChatMessages([...chatMessages, newMessage]);
    setInputMessage('');

    // Simulate AI response for DM
    if (isDM) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          text: 'I can help you with that! What specific aspect would you like assistance with?',
          sender: 'AI Assistant',
          isAI: true
        }]);
      }, 1000);
    }
  };

  const getStatModifier = (stat: number) => {
    const modifier = Math.floor((stat - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{campaign.name}</h1>
                <p className="text-sm text-purple-200">{campaign.description}</p>
              </div>
            </div>
            <Badge variant={isDM ? 'default' : 'secondary'} className="text-sm">
              {isDM ? 'Dungeon Master' : 'Player'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Left Column - Character/User Info */}
          <div className="lg:col-span-1">
            {isDM ? (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Party Members
                  </CardTitle>
                  <CardDescription>
                    {campaign.users.filter(u => u.role === 'player').length} player(s) in this campaign
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-400px)]">
                    <div className="space-y-4">
                      {campaign.users
                        .filter(u => u.role === 'player')
                        .map(campaignUser => {
                          const character = mockCharacters.find(c => c.id === campaignUser.characterId);
                          return (
                            <div key={campaignUser.userId} className="p-4 bg-secondary/50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{campaignUser.username}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {character ? `Level ${character.level}` : 'No Character'}
                                </Badge>
                              </div>
                              {character && (
                                <>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    {character.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {character.class} • HP: {character.hp.current}/{character.hp.max}
                                  </p>
                                </>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Your Character</CardTitle>
                  {playerCharacter && (
                    <CardDescription>{playerCharacter.name}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {playerCharacter ? (
                    <ScrollArea className="h-[calc(100vh-400px)]">
                      <div className="space-y-6">
                        {/* Basic Info */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Class</p>
                              <p className="text-lg font-semibold">{playerCharacter.class}</p>
                            </div>
                            <Badge variant="default" className="text-lg px-3 py-1">
                              Level {playerCharacter.level}
                            </Badge>
                          </div>
                          <Separator className="my-4" />
                        </div>

                        {/* HP */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Hit Points</p>
                            <p className="text-sm">
                              <span className="text-lg font-bold">{playerCharacter.hp.current}</span>
                              <span className="text-muted-foreground"> / {playerCharacter.hp.max}</span>
                            </p>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all"
                              style={{ width: `${(playerCharacter.hp.current / playerCharacter.hp.max) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div>
                          <p className="text-sm font-medium mb-3">Ability Scores</p>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(playerCharacter.stats).map(([stat, value]) => (
                              <div key={stat} className="bg-secondary/50 p-3 rounded-lg text-center">
                                <p className="text-xs text-muted-foreground uppercase mb-1">
                                  {stat.slice(0, 3)}
                                </p>
                                <p className="text-2xl font-bold">{value}</p>
                                <p className="text-xs text-muted-foreground">
                                  {getStatModifier(value)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Experience */}
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Experience</p>
                            <p className="text-sm font-semibold">{playerCharacter.experience} XP</p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No character assigned</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Chat/Actions */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isDM ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      AI Assistant
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Player Actions
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {isDM 
                    ? 'Get help with campaign management, NPC generation, and storytelling'
                    : 'Describe what your character wants to do'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages Area */}
                <ScrollArea className="flex-1 mb-4 pr-4">
                  <div className="space-y-4">
                    {isDM && chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg ${
                          msg.isAI
                            ? 'bg-purple-500/20 border border-purple-500/30'
                            : 'bg-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {msg.isAI && <Sparkles className="w-4 h-4 text-purple-400" />}
                          <p className="text-xs font-semibold text-muted-foreground">
                            {msg.sender}
                          </p>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))}
                    {!isDM && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="mb-2">Submit your action below</p>
                        <p className="text-sm">The DM will respond to your actions</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="space-y-2">
                  <Textarea
                    placeholder={isDM 
                      ? 'Ask the AI assistant for help with your campaign...'
                      : 'I want to investigate the door for traps...'
                    }
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[100px] resize-none"
                  />
                  <Button onClick={handleSendMessage} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    {isDM ? 'Send Message' : 'Submit Action'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
