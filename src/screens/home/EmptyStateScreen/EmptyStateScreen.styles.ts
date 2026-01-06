import { StyleSheet } from 'react-native';
import { LIGHT_BLUE, PRIMARY_BLUE, GRAY_DARK } from '../../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT_BLUE, // #DDEBF8
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: PRIMARY_BLUE,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: GRAY_DARK,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    button: {
        width: '100%',
    },
});
