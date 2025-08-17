import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRightLeft, Languages, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import TextArea from './components/TextArea';
import LoadingSpinner from './components/LoadingSpinner';
import { languages, targetLanguages } from './data/languages';
import { translationService } from './services/translationService';

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'success'
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
  };

  const translateText = useCallback(async () => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      return;
    }

    setIsTranslating(true);
    try {
      const sourceLang = sourceLanguage === 'auto' ? 'en' : sourceLanguage;
      const result = await translationService.translateText(sourceText, sourceLang, targetLanguage);
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation failed:', error);
      showNotification('Translation failed. Please try again.', 'error');
      setTranslatedText('');
    } finally {
      setIsTranslating(false);
    }
  }, [sourceText, sourceLanguage, targetLanguage]);

  // Auto-translate with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sourceText.trim()) {
        translateText();
      } else {
        setTranslatedText('');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [sourceText, sourceLanguage, targetLanguage, translateText]);

  const swapLanguages = () => {
    if (sourceLanguage === 'auto') return;
    
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = () => {
    showNotification('Text copied to clipboard!', 'success');
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Languages className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Universal Translator
            </h1>
            <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Instantly translate between 70+ languages with AI-powered accuracy and beautiful design
          </p>
        </div>

        {/* Main translator card */}
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
          {/* Language selectors */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/50">
            <div className="flex items-center gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <LanguageSelector
                  selectedLanguage={sourceLanguage}
                  onLanguageChange={setSourceLanguage}
                  languages={languages}
                  label="From"
                />
              </div>
              
              <button
                onClick={swapLanguages}
                disabled={sourceLanguage === 'auto'}
                className={`mt-6 p-3 rounded-full transition-all duration-200 ${
                  sourceLanguage === 'auto'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95'
                }`}
                title={sourceLanguage === 'auto' ? 'Cannot swap with auto-detect' : 'Swap languages'}
              >
                <ArrowRightLeft className="h-5 w-5" />
              </button>
              
              <div className="flex-1">
                <LanguageSelector
                  selectedLanguage={targetLanguage}
                  onLanguageChange={setTargetLanguage}
                  languages={targetLanguages}
                  label="To"
                />
              </div>
            </div>
          </div>

          {/* Text areas */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Source text */}
            <div className="p-6 border-r border-gray-200/50">
              <TextArea
                value={sourceText}
                onChange={setSourceText}
                placeholder="Enter text to translate..."
                label="Original Text"
                onClear={handleClear}
                maxLength={5000}
              />
            </div>

            {/* Translated text */}
            <div className="p-6 bg-gradient-to-br from-gray-50/50 to-purple-50/30">
              {isTranslating ? (
                <div className="mt-8">
                  <LoadingSpinner />
                </div>
              ) : (
                <TextArea
                  value={translatedText}
                  placeholder="Translation will appear here..."
                  readonly
                  label="Translated Text"
                  onCopy={handleCopy}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-200/50 text-center">
            <p className="text-sm text-gray-500">
              Powered by advanced translation technology • 
              <span className="ml-1 text-blue-600 font-medium">70+ languages supported</span>
            </p>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Translation</h3>
            <p className="text-gray-600 text-sm">Instant translations as you type with intelligent debouncing</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Languages className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">70+ Languages</h3>
            <p className="text-gray-600 text-sm">Support for major world languages with native script display</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Features</h3>
            <p className="text-gray-600 text-sm">Auto-detect, copy to clipboard, and seamless language swapping</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;