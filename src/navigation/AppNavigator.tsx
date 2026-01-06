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
                            // Ao ir para Home, substituímos a stack atual pela TabNavigator
                            // Isso garante que se o usuário clicar em "voltar", ele não volta para o Empty State
                            props.navigation.replace('MainTabs');
                        }}
                        onAddTransaction={() => {
                            // Se o usuário quer adicionar, navegamos para a TabNavigator, mas especificamente para a tela de Add (se existir)
                            // Ou apenas para a home onde ele pode clicar no botão de adicionar.
                            // Vou assumir navegação para a home por enquanto, ou para 'Add' se a TabNavigator expor isso.
                            // Olhando TabNavigator.tsx, a tela se chama 'Add'.
                            props.navigation.replace('MainTabs', { screen: 'Add' });
                        }}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
        </Stack.Navigator>
    );
};
