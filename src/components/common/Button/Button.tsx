import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { styles } from './Button.styles';
import { WHITE, SECONDARY_BLUE } from '../../../utils/colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'outline';
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    loading = false,
    style,
    disabled,
    ...rest
}) => {
    const containerStyle =
        variant === 'primary' ? styles.primaryContainer : styles.outlineContainer;
    const textStyle =
        variant === 'primary' ? styles.primaryText : styles.outlineText;

    return (
        <TouchableOpacity
            style={[
                styles.container,
                containerStyle,
                disabled && styles.disabled,
                style,
            ]}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? WHITE : SECONDARY_BLUE}
                    size="small"
                />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};
