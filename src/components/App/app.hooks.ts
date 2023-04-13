import { useEffect } from 'react';

import { IMAGES } from 'assets/images';

export const usePreloadImages = () => {
  useEffect(() => {
    IMAGES.forEach(image => {
      new Image().src = image;
    });
  }, []);
};

export const useAppSideEffects = () => {
  usePreloadImages();
};
