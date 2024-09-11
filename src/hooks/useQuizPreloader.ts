import { useEffect } from 'react';
import { Themes } from '../types';

export const useQuizPreloader = (quizData: Themes | undefined) => {
  useEffect(() => {
    if (!quizData) return;
    const preloadImages = async () => {
      const imageUrls = quizData.themes
        .flatMap((theme) => theme.questions.map((question) => question.feedbackImage))
        .filter((url) => url);
      const preloadImage = async (url: string) => {
        try {
          const cache = await caches.open('quiz-images-cache');
          const response = await fetch(url, { mode: 'no-cors' });
          await cache.put(url, response);
        } catch (error) {
          console.error(`Erreur lors du préchargement de l'image ${url}:`, error);
        }
      };

      await Promise.all(imageUrls.map(preloadImage));
    };

    preloadImages();
  }, [quizData]);
};
