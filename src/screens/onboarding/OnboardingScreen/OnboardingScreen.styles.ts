import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT  } = Dimensions.get('window');
const LOGO_WIDTH = Math.max(50, Math.min(70, SCREEN_HEIGHT * 0.08)); // Entre 50-70px

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingBottom: Math.max(50, SCREEN_HEIGHT * 0.07), 
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Math.max(30, SCREEN_WIDTH * 0.1), 
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: Math.max(350, Math.min(500, SCREEN_HEIGHT * 0.4)), 
    marginLeft: SCREEN_WIDTH * -0.05,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    marginRight: SCREEN_WIDTH * 0.025,
    alignItems: 'flex-start',
    flexShrink: 0,
    justifyContent: 'flex-start',
  },
  textContainer: {
    flex: 1, 
    alignItems: 'flex-start',
    flexShrink: 1,
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH,
    marginTop: -(LOGO_WIDTH * 0.92),
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.11,
    fontFamily: 'WorkSans_700Bold',
    textAlign: 'left',
    marginTop: 0,
    marginBottom: SCREEN_HEIGHT * 0.025,
    paddingTop: 0,
    lineHeight: SCREEN_WIDTH * 0.14,
    color: '#0F2C59',
    flexShrink: 1,
  },
  description: {
    fontSize: SCREEN_WIDTH * 0.04, 
    fontFamily: 'Poppins_500Medium',
    textAlign: 'left',
    lineHeight: SCREEN_WIDTH * 0.06, 
    letterSpacing: 1,
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.1,
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: SCREEN_WIDTH * 0.06,
    height: SCREEN_HEIGHT * 0.0075,
    borderRadius: SCREEN_HEIGHT * 0.00375,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotMargin: {
    marginRight: 4,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: SCREEN_WIDTH * 0.08,
  },
  button: {
    paddingVertical: SCREEN_HEIGHT * 0.0175,
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    borderRadius: 50,
    minWidth: SCREEN_WIDTH * 0.1,
    maxWidth: SCREEN_WIDTH * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: SCREEN_WIDTH * 0.035, 
    fontWeight: '600',
  },
  buttonIcon: {
    width: SCREEN_WIDTH * 0.045,
    height: SCREEN_WIDTH * 0.045,
    marginLeft: SCREEN_WIDTH * 0.02, 
  },
});



