import { StyleSheet, Dimensions, Platform } from 'react-native';
import { normalize } from '../../../utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEBF8',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#DDEBF8',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: normalize(24),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: normalize(20),
    backgroundColor: '#DDEBF8',
  },
  header: {
    paddingTop: normalize(60),
    paddingBottom: normalize(60),
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: normalize(207),
    height: normalize(52),
  },
  content: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(40),
  },
  title: {
    fontSize: normalize(24),
    fontFamily: 'WorkSans-Bold',
    color: '#0F2C59',
    marginBottom: normalize(40),
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
  },
  form: {
    width: '100%',
    maxWidth: normalize(400),
  },
  inputContainer: {
    position: 'relative',
    marginBottom: normalize(20),
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: normalize(48),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(50),
    paddingHorizontal: normalize(20),
    fontSize: normalize(14),
    fontFamily: 'Poppins_400Regular',
    color: '#0F2C59',
    borderWidth: 1,
    borderColor: 'transparent',
    alignSelf: 'center',
  },
  eyeIconButton: {
    position: 'absolute',
    right: normalize(16),
    top: normalize(7),
    padding: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    width: '100%',
    height: normalize(56),
    maxWidth: normalize(306),
    backgroundColor: '#009BE9', // Azul brilhante
    borderRadius: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10),
    alignSelf: 'center',
    shadowColor: '#009BE9',
    shadowOffset: {
      width: 0,
      height: normalize(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: normalize(4.65),
    elevation: normalize(8),
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  footer: {
    marginTop: normalize(60),
    alignItems: 'center',
  },
  footerText: {
    fontSize: normalize(14),
    fontFamily: 'Poppins_400Regular',
    color: '#0F2C59',
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
});