import { Video } from '../types';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Beautiful Nature Sounds - Relaxing Forest Ambience',
    description: 'Immerse yourself in the peaceful sounds of nature with this relaxing forest ambience. Perfect for meditation, study, or sleep.',
    thumbnail: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '10:30',
    views: 1250000,
    likes: 45000,
    dislikes: 1200,
    uploadDate: '2024-01-15',
    channel: {
      id: 'nature-sounds',
      name: 'Nature Sounds',
      avatar: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 2500000,
      verified: true
    },
    category: 'music'
  },
  {
    id: '2',
    title: 'Modern Web Development Tutorial - React & TypeScript',
    description: 'Learn modern web development with React and TypeScript. This comprehensive tutorial covers everything you need to know.',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '45:22',
    views: 890000,
    likes: 32000,
    dislikes: 800,
    uploadDate: '2024-01-20',
    channel: {
      id: 'tech-tutorials',
      name: 'Tech Tutorials Pro',
      avatar: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 1800000,
      verified: true
    },
    category: 'technology'
  },
  {
    id: '3',
    title: 'Epic Gaming Moments - Best Highlights 2024',
    description: 'The most epic gaming moments and highlights from 2024. Featuring incredible plays and unforgettable moments.',
    thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '15:45',
    views: 2100000,
    likes: 78000,
    dislikes: 2100,
    uploadDate: '2024-01-18',
    channel: {
      id: 'gaming-central',
      name: 'Gaming Central',
      avatar: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 3200000,
      verified: true
    },
    category: 'gaming'
  },
  {
    id: '4',
    title: 'Cooking Masterclass - Italian Pasta Secrets',
    description: 'Learn the secrets of authentic Italian pasta making from a professional chef. Step-by-step guide to perfect pasta.',
    thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '28:15',
    views: 650000,
    likes: 28000,
    dislikes: 500,
    uploadDate: '2024-01-22',
    channel: {
      id: 'chef-masters',
      name: 'Chef Masters',
      avatar: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 950000,
      verified: false
    },
    category: 'entertainment'
  },
  {
    id: '5',
    title: 'Space Exploration Documentary - Journey to Mars',
    description: 'An incredible journey through space exploration and the mission to Mars. Featuring real NASA footage and expert interviews.',
    thumbnail: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '52:30',
    views: 1800000,
    likes: 65000,
    dislikes: 1800,
    uploadDate: '2024-01-10',
    channel: {
      id: 'space-docs',
      name: 'Space Documentaries',
      avatar: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 2800000,
      verified: true
    },
    category: 'education'
  },
  {
    id: '6',
    title: 'Chill Lo-Fi Hip Hop Mix - Study & Relax',
    description: 'Perfect lo-fi hip hop mix for studying, working, or just relaxing. Smooth beats and chill vibes.',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '1:23:45',
    views: 3500000,
    likes: 125000,
    dislikes: 3200,
    uploadDate: '2024-01-05',
    channel: {
      id: 'lofi-beats',
      name: 'Lo-Fi Beats',
      avatar: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 4200000,
      verified: true
    },
    category: 'music'
  }
];