import { StyleSheet } from 'react-native';
import { BLUE_SKY, WHITE, PRIMARY_BLUE } from '../../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryContainer: {
        backgroundColor: BLUE_SKY,
        borderWidth: 1,
        borderColor: BLUE_SKY,
    },
    outlineContainer: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: WHITE,
    },
    outlineText: {
        color: PRIMARY_BLUE,
    },
    disabled: {
        opacity: 0.6,
    },
});
