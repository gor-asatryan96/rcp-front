import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IMAGES } from 'assets/images';
import {
  selectIsGlobalScrollOff,
  selectIsMenuSidebarOpen,
} from 'redux/reducers/appConfigs/appConfigs.slice';
import { useIsMobile } from 'helpers/hooks.helpers';

export const usePreloadImages = () => {
  useEffect(() => {
    IMAGES.forEach(image => {
      new Image().src = image;
    });
  }, []);
};

export const useBodyScrollOff = () => {
  const isGlobalScrollOff = useSelector(selectIsGlobalScrollOff);
  const isMenuOpen = useSelector(selectIsMenuSidebarOpen);
  const isMobile = useIsMobile();

  const isScrollOf = isGlobalScrollOff || (isMobile && isMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isScrollOf ? 'hidden' : '';
  }, [isScrollOf]);
};

export const useAppSideEffects = () => {
  usePreloadImages();
  useBodyScrollOff();
};
