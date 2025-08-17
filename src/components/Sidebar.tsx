import React from 'react';
import { Home, TrendingUp, Music, Gamepad2, BookOpen, Newspaper, Trophy, Settings, History, Clock, ThumbsUp } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, selectedCategory, onCategoryChange }) => {
  const menuItems = [
    { id: 'all', label: 'Home', icon: Home },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'sports', label: 'Sports', icon: Trophy },
  ];

  const libraryItems = [
    { id: 'history', label: 'History', icon: History },
    { id: 'watch-later', label: 'Watch Later', icon: Clock },
    { id: 'liked', label: 'Liked Videos', icon: ThumbsUp },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4 space-y-6">
        {/* Main Menu */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onCategoryChange(item.id)}
                className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === item.id
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {isOpen && (
          <>
            <hr className="border-gray-200" />
            
            {/* Library */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-3">
                Library
              </h3>
              {libraryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onCategoryChange(item.id)}
                    className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === item.id
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <hr className="border-gray-200" />

            {/* Settings */}
            <button className="w-full flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Settings className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Settings</span>
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;