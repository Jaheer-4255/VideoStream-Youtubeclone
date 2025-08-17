import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, CheckCircle } from 'lucide-react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Video Player */}
      <div className="relative flex-1 bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-contain"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onClick={togglePlay}
        />

        {/* Video Controls Overlay */}
        {showControls && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30">
            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 text-lg font-medium"
              >
                ← Back
              </button>
            </div>

            {/* Center Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors"
                >
                  <Play className="h-12 w-12 text-white ml-1" />
                </button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="text-white hover:text-gray-300">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-white hover:text-gray-300">
                      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <button className="text-white hover:text-gray-300">
                  <Maximize className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info Panel */}
      <div className="bg-white p-6 max-h-96 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h1>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src={video.channel.avatar}
                alt={video.channel.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{video.channel.name}</h3>
                  {video.channel.verified && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{formatViews(video.channel.subscribers)} subscribers</p>
              </div>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100 rounded-full">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-l-full transition-colors ${
                    isLiked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                  }`}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>{formatViews(video.likes + (isLiked ? 1 : 0))}</span>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-r-full transition-colors ${
                    isDisliked ? 'bg-red-100 text-red-600' : 'hover:bg-gray-200'
                  }`}
                >
                  <ThumbsDown className="h-5 w-5" />
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Share className="h-5 w-5" />
                <span>Share</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Download className="h-5 w-5" />
                <span>Download</span>
              </button>

              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span>{formatViews(video.views)} views</span>
            <span>•</span>
            <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;