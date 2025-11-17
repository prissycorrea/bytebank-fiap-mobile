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
  loader: {
    width: 40,
    height: 40,
  },
  version: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.7,
  },
});
