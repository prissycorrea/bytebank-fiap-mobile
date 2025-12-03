import { StyleSheet, Dimensions } from 'react-native';
import { normalize } from '../../../utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEBF8',
  },
  content: {
    flex: 1,
    paddingHorizontal: normalize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: normalize(60),
    left: normalize(24),
    alignItems: 'flex-start',
    width: '100%',
  },
  logo: {
    width: normalize(207),
    height: normalize(52),
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  checkmarkImage: {
    width: normalize(120),
    height: normalize(120),
    marginBottom: normalize(40),
  },
  successTitle: {
    fontSize: normalize(24),
    fontFamily: 'WorkSans-Bold',
    color: '#0F2C59',
    marginBottom: normalize(16),
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: normalize(16),
    fontFamily: 'Poppins_400Regular',
    color: '#0F2C59',
    textAlign: 'center',
  },
  successSubtitleBold: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: 'bold',
  },
});

