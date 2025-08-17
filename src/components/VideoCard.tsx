import React from 'react';
import { Play, Eye, ThumbsUp, Clock, CheckCircle } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div
      onClick={() => onClick(video)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
              <Play className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex gap-3">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm text-gray-600">{video.channel.name}</span>
              {video.channel.verified && (
                <CheckCircle className="h-4 w-4 text-blue-500" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{formatViews(video.views)} views</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(video.uploadDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;