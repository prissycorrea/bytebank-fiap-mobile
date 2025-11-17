import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 100,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  spinnerWrapper: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  arcWhite: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '30deg' }],
  },
  arcBlue: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#00AAFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '300deg' }],
  },
  version: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.7,
  },
});
