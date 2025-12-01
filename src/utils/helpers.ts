import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Base width for normalization (design width, commonly 375 for iPhone)
const BASE_WIDTH = 375;

/**
 * Normalizes a size value based on screen width
 * @param size - The size value to normalize
 * @returns The normalized size value
 */
export const normalize = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

