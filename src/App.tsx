import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import { mockVideos } from './data/mockData';
import { Video } from './types';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredVideos = useMemo(() => {
    let videos = mockVideos;

    // Filter by category
    if (selectedCategory !== 'all' && selectedCategory !== 'trending') {
      videos = videos.filter(video => video.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      videos = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.channel.name.toLowerCase().includes(query)
      );
    }

    // Sort trending videos by views
    if (selectedCategory === 'trending') {
      videos = [...videos].sort((a, b) => b.views - a.views);
    }

    return videos;
  }, [selectedCategory, searchQuery]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  if (!user) {
    return <LoginPage />;
  }

  if (selectedVideo) {
    return <VideoPlayer video={selectedVideo} onClose={handleCloseVideo} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="flex pt-16">
        <Sidebar
          isOpen={sidebarOpen}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}>
          <div className="p-6">
            <VideoGrid
              videos={filteredVideos}
              onVideoClick={handleVideoClick}
              loading={loading}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;