interface TranslationResponse {
  responseData: {
    translatedText: string;
    match: number;
  };
  quotaFinished: boolean;
  responseDetails: string;
  responseStatus: number;
}

class TranslationService {
  private baseUrl = 'https://api.mymemory.translated.net/get';

  async translateText(text: string, fromLang: string, toLang: string): Promise<string> {
    if (!text.trim()) {
      return '';
    }

    try {
      const url = `${this.baseUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TranslationResponse = await response.json();
      
      if (data.responseStatus === 200) {
        return data.responseData.translatedText;
      } else {
        throw new Error(data.responseDetails || 'Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text. Please try again.');
    }
  }

  async detectLanguage(text: string): Promise<string> {
    if (!text.trim()) {
      return 'en';
    }

    try {
      const url = `${this.baseUrl}?q=${encodeURIComponent(text)}&langpair=auto|en`;
      const response = await fetch(url);
      const data: TranslationResponse = await response.json();
      
      // MyMemory doesn't provide language detection, so we'll return 'auto' for now
      // In a production app, you might want to use Google Translate API or another service
      return 'auto';
    } catch (error) {
      console.error('Language detection error:', error);
      return 'en';
    }
  }
}

export const translationService = new TranslationService();