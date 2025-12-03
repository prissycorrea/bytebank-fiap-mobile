import { StyleSheet } from 'react-native';
import { normalize } from '../../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEBF8',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(20),
  },
  header: {
    marginBottom: normalize(30),
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(28),
    fontFamily: 'WorkSans_700Bold',
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: normalize(10),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: normalize(16),
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: normalize(18),
    fontFamily: 'Poppins_400Regular',
    color: '#0F2C59',
    textAlign: 'center',
  },
  footer: {
    marginTop: normalize(40),
    alignItems: 'center',
    paddingBottom: normalize(20),
  },
  logoutButton: {
    width: '100%',
    maxWidth: normalize(200),
    height: normalize(48),
    backgroundColor: '#FF6B6B',
    borderRadius: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: normalize(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: normalize(4.65),
    elevation: normalize(8),
  },
  logoutButtonText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});

