export interface User {
  id: string;
  email: string;
  username: string;
  password?: string;
}

export interface Character {
  id: string;
  userId: string;
  campaignId: string;
  name: string;
  class: string;
  level: number;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  hp: {
    current: number;
    max: number;
  };
  experience: number;
}

export interface CampaignUser {
  userId: string;
  username: string;
  role: 'dm' | 'player';
  characterId?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  dmId: string;
  users: CampaignUser[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  campaignId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
  isAI?: boolean;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'dm@example.com',
    username: 'DungeonMasterDave',
    password: 'password'
  },
  {
    id: 'user-2',
    email: 'player1@example.com',
    username: 'ElvenArcher',
    password: 'password'
  },
  {
    id: 'user-3',
    email: 'player2@example.com',
    username: 'DwarfWarrior',
    password: 'password'
  }
];

// Mock campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'The Lost Mines of Phandelver',
    description: 'A classic adventure through treacherous mines filled with goblins and ancient secrets.',
    dmId: 'user-1',
    users: [
      { userId: 'user-1', username: 'DungeonMasterDave', role: 'dm' },
      { userId: 'user-2', username: 'ElvenArcher', role: 'player', characterId: 'char-1' },
      { userId: 'user-3', username: 'DwarfWarrior', role: 'player', characterId: 'char-2' }
    ],
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'campaign-2',
    name: 'Curse of Strahd',
    description: 'Enter Barovia, a land of gothic horror ruled by the vampire Count Strahd von Zarovich.',
    dmId: 'user-1',
    users: [
      { userId: 'user-1', username: 'DungeonMasterDave', role: 'dm' },
      { userId: 'user-2', username: 'ElvenArcher', role: 'player', characterId: 'char-3' }
    ],
    createdAt: '2026-01-20T14:30:00Z'
  },
  {
    id: 'campaign-3',
    name: 'Waterdeep: Dragon Heist',
    description: 'A treasure hunt through the City of Splendors with intrigue around every corner.',
    dmId: 'user-1',
    users: [
      { userId: 'user-1', username: 'DungeonMasterDave', role: 'dm' },
      { userId: 'user-3', username: 'DwarfWarrior', role: 'player', characterId: 'char-4' }
    ],
    createdAt: '2026-01-25T09:15:00Z'
  }
];

// Mock characters
export const mockCharacters: Character[] = [
  {
    id: 'char-1',
    userId: 'user-2',
    campaignId: 'campaign-1',
    name: 'Lyra Silverwind',
    class: 'Ranger',
    level: 5,
    stats: {
      strength: 12,
      dexterity: 18,
      constitution: 14,
      intelligence: 13,
      wisdom: 16,
      charisma: 10
    },
    hp: {
      current: 38,
      max: 45
    },
    experience: 6500
  },
  {
    id: 'char-2',
    userId: 'user-3',
    campaignId: 'campaign-1',
    name: 'Thorin Ironforge',
    class: 'Fighter',
    level: 5,
    stats: {
      strength: 17,
      dexterity: 13,
      constitution: 16,
      intelligence: 10,
      wisdom: 12,
      charisma: 8
    },
    hp: {
      current: 52,
      max: 52
    },
    experience: 6800
  },
  {
    id: 'char-3',
    userId: 'user-2',
    campaignId: 'campaign-2',
    name: 'Seraphina Moonwhisper',
    class: 'Cleric',
    level: 3,
    stats: {
      strength: 10,
      dexterity: 12,
      constitution: 14,
      intelligence: 13,
      wisdom: 17,
      charisma: 15
    },
    hp: {
      current: 24,
      max: 24
    },
    experience: 900
  },
  {
    id: 'char-4',
    userId: 'user-3',
    campaignId: 'campaign-3',
    name: 'Grimjaw',
    class: 'Barbarian',
    level: 4,
    stats: {
      strength: 18,
      dexterity: 14,
      constitution: 16,
      intelligence: 8,
      wisdom: 11,
      charisma: 9
    },
    hp: {
      current: 44,
      max: 48
    },
    experience: 2700
  }
];

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    campaignId: 'campaign-1',
    userId: 'user-1',
    username: 'DungeonMasterDave',
    message: 'What would you like to do next?',
    timestamp: '2026-02-02T10:30:00Z'
  }
];
