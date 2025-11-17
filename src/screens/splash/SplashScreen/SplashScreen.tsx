import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './SplashScreen.styles';
import packageJson from '../../../../package.json';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const SplashScreen = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#001C36', '#0F2C59', '#003689']}
      locations={[0, 0.33, 0.74]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          source={require('../../../../assets/splash.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.loaderContainer}>
          <AnimatedImage
            source={require('../../../../assets/images/loader.png')}
            style={[
              styles.loader,
              {
                transform: [{ rotate }],
              },
            ]}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text style={styles.version}>v {packageJson.version}</Text>
    </LinearGradient>
  );
};
