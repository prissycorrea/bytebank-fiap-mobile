import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import { EmptyStateScreen } from '../screens/home/EmptyStateScreen/EmptyStateScreen';
import { View } from 'react-native';
import { PRIMARY_BLUE } from '../utils/colors';

const Stack = createStackNavigator();

interface AppNavigatorProps {
    initialRouteName?: string;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({ initialRouteName = "MainTabs" }) => {
    return (
        <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="EmptyState">
                {(props) => (
                    <EmptyStateScreen
                        onGoHome={() => {
                            props.navigation.replace('MainTabs');
                        }}
                        onAddTransaction={() => {
                            props.navigation.replace('MainTabs', { screen: 'Add' });
                        }}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
        </Stack.Navigator>
    );
};
