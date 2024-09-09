import { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';

const Controls = () => {
  const { zoomIn, zoomOut } = useControls();

  return (
    <div className="absolute top-4 right-4 flex justify-center items-center space-x-2">
      <div className="flex justify-center items-center space-x-4">
        <button onClick={() => zoomOut()}>
          <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_48_388)">
              <path
                d="M49.9891 47.0497L36.9715 34.0321C44.2505 25.1297 42.9344 12.0121 34.0321 4.73315C25.1297 -2.54576 12.0121 -1.22974 4.73315 7.6726C-2.54576 16.5749 -1.22974 29.6926 7.6726 36.9715C15.3407 43.2413 26.3641 43.2413 34.0321 36.9715L47.0497 49.9891L49.9891 47.0497ZM20.8856 37.5162C11.7007 37.5162 4.25502 30.0704 4.25502 20.8856C4.25502 11.7008 11.7007 4.25502 20.8856 4.25502C30.0705 4.25502 37.5162 11.7008 37.5162 20.8856C37.5059 30.0662 30.0662 37.5059 20.8856 37.5162Z"
                fill="#00004E"
              />
              <path d="M29.2009 18.8066H12.5703V22.9643H29.2009V18.8066Z" fill="#00004E" />
            </g>
            <defs>
              <clipPath id="clip0_48_388">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>

        <div className="w-[1px] h-6 bg-primary-dark-blue"></div>

        <button onClick={() => zoomIn()}>
          <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_48_384)">
              <path
                d="M50 47.0599L36.9795 34.0395C44.2601 25.1352 42.9438 12.0148 34.0395 4.73422C25.1352 -2.54634 12.0148 -1.23003 4.73423 7.67436C-2.54633 16.5788 -1.23003 29.6991 7.67427 36.9796C15.344 43.2507 26.3698 43.2507 34.0394 36.9796L47.0599 49.9999L50 47.0599ZM20.8902 37.5244C11.7034 37.5244 4.25601 30.077 4.25601 20.8902C4.25601 11.7034 11.7034 4.256 20.8902 4.256C30.077 4.256 37.5244 11.7034 37.5244 20.8902C37.514 30.0727 30.0727 37.514 20.8902 37.5244Z"
                fill="#00004E"
              />
              <path
                d="M22.9696 12.5732H18.811V18.811H12.5732V22.9696H18.811V29.2074H22.9696V22.9696H29.2074V18.811H22.9696V12.5732Z"
                fill="#00004E"
              />
            </g>
            <defs>
              <clipPath id="clip0_48_384">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export const ZoomableImage = ({ imageUrl, imageAlt }: { imageUrl: string; imageAlt: string }) => {
  const [cachedSrc, setCachedSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkCacheAndLoadImage = async () => {
      try {
        const cache = await caches.open('quiz-images');
        const cachedResponse = await cache.match(imageUrl);
        if (cachedResponse) {
          setCachedSrc(imageUrl);
        } else {
          setCachedSrc(null);
        }
      } catch (err) {
        setError(true);
        console.error(`Erreur lors de la vérification du cache pour ${imageUrl}`, err);
      } finally {
        setLoading(false);
      }
    };

    checkCacheAndLoadImage();
  }, [imageUrl, cachedSrc]);

  if (loading) return <div>Chargement de l'image...</div>;
  if (error) return <div>Impossible de charger l'image.</div>;
  if (!cachedSrc) return <div>Image non disponible en cache.</div>;

  return (
    <div className="flex justify-center items-center mt-4 w-full h-full max-w-[845px] max-h-[500px]">
      <TransformWrapper initialScale={1} minScale={1} maxScale={2}>
        <Controls />
        <TransformComponent>
          <div className="flex justify-center items-center w-full h-full">
            <img src={cachedSrc} alt={imageAlt} className="max-w-[845px] max-h-[500px]" />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
