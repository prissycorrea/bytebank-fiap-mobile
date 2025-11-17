import React from 'react';
import { SplashScreen } from './src/screens/splash';

export default function App() {
  return <SplashScreen />;
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { SplashScreen } from './src/screens/splash';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"  // ← SplashScreen como tela inicial
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         {/* Adicione suas outras telas aqui */}
//         {/* <Stack.Screen name="Main" component={MainScreen} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }