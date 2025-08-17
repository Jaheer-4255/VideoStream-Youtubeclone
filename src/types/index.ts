export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  uploadDate: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscribers: number;
    verified: boolean;
  };
  category: 'music' | 'entertainment' | 'education' | 'gaming' | 'news' | 'sports' | 'technology';
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
}