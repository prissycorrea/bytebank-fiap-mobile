import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './OnboardingScreen.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  backgroundColor?: string;
  gradientColors?: string[];
  gradientLocations?: number[];
  logoSource: any;
  title: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
  buttonText: string;
  buttonBgColor: string;
  buttonTextColor: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    gradientColors: ['#009BE9', '#00AAFF', '#43C0FF'],
    gradientLocations: [0, 0.39, 0.93],
    logoSource: require('../../../../assets/images/logo-mini-green.png'),
    title: 'Controle total na palma da sua mão',
    description:
      'Bem-vindo ao ByteBank! Veja para onde seu dinheiro está indo e tome decisões financeiras mais inteligentes.',
    descriptionColor: '#003689',
    buttonText: 'Próximo',
    buttonBgColor: '#0F2C59',
    buttonTextColor: '#FFFFFF',
  },
  {
    id: 2,
    gradientColors: ['#65B100', '#8CC63F', '#86E00F'],
    gradientLocations: [0, 0.46, 1],
    logoSource: require('../../../../assets/images/logo-mini-blue.png'),
    title: 'Entenda e organize suas finanças',
    description:
      'Com gráficos e relatórios claros, você saberá exatamente suas receitas, despesas e onde pode economizar.',
    descriptionColor: '#003689',
    buttonText: 'Próximo',
    buttonBgColor: '#0F2C59',
    buttonTextColor: '#FFFFFF',
  },
  {
    id: 3,
    gradientColors: ['#001C36', '#0F2C59', '#003689'],
    gradientLocations: [0, 0.33, 0.74],
    logoSource: require('../../../../assets/images/logo-mini-color.png'),
    title: 'Alcance seus objetivos',
    description:
      'Registre suas transações facilmente, planeje seu orçamento e veja seu saldo crescer. Comece a gerenciar hoje mesmo!',
    titleColor: '#FFFFFF',
    buttonText: 'Iniciar',
    buttonBgColor: '#FFFFFF',
    buttonTextColor: '#1A3A5C',
  },
];

export const OnboardingScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      console.log('Onboarding concluído!');
    }
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const renderLogo = (logoSource: any) => (
    <Image source={logoSource} style={styles.logo} resizeMode="contain" />
  );

  const renderSlide = (slide: OnboardingSlide) => {
    const slideContent = (
      <>
        <View style={styles.contentContainer}>
          <View style={styles.contentRow}>
            <View style={styles.logoContainer}>
              {renderLogo(slide.logoSource)}
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.title, slide.titleColor && { color: slide.titleColor }]}>
                {slide.title}
              </Text>
              <Text style={[styles.description, slide.descriptionColor && { color: slide.descriptionColor }]}>
                {slide.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.dotActive,
                  index < slides.length - 1 && styles.dotMargin,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: slide.buttonBgColor,
              },
            ]}
            onPress={handleNext}
          >
            <Text style={[styles.buttonText, { color: slide.buttonTextColor }]}>
              {slide.buttonText}
            </Text>
            <Image
              source={require('../../../../assets/icons/right-arrow.png')}
              style={[styles.buttonIcon, { tintColor: slide.buttonTextColor }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </>
    );

    if (slide.gradientColors) {
      return (
        <LinearGradient
          key={slide.id}
          colors={slide.gradientColors as any}
          locations={slide.gradientLocations as any}
          style={styles.slide}
        >
          {slideContent}
        </LinearGradient>
      );
    }

    return (
      <View
        key={slide.id}
        style={[
          styles.slide,
          { backgroundColor: slide.backgroundColor },
        ]}
      >
        {slideContent}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide) => renderSlide(slide))}
      </ScrollView>
    </View>
  );
};
