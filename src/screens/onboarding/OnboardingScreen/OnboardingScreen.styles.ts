import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LOGO_WIDTH = 60;
const LOGO_MARGIN = 20;
const PADDING_HORIZONTAL = 80; // 40px de cada lado
const TEXT_CONTAINER_WIDTH = (SCREEN_WIDTH - PADDING_HORIZONTAL - LOGO_WIDTH - LOGO_MARGIN) * 0.75;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingBottom: 60,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 40,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 450,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    marginRight: 10,
    alignItems: 'flex-start',
    flexShrink: 0,
    justifyContent: 'flex-start',
  },
  textContainer: {
    width: TEXT_CONTAINER_WIDTH,
    alignItems: 'flex-start',
    flexShrink: 1,
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: -55,
  },
  title: {
    fontSize: 44,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 20,
    paddingTop: 0,
    lineHeight: 56,
    color: '#0F2C59',
    flexShrink: 1,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: 1,
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotMargin: {
    marginRight: 4,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 32,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    minWidth: 91,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
});



