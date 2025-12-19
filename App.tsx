/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme,  } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignupScreen from './src/screens/SignupScreen';
import VerifyPhoneScreen from './src/screens/VerifyPhoneScreen';
import HomeScreen from './src/screens/HomeScreen';
import MyRidesScreen from './src/screens/MyRidesScreen';
import RideDetailsScreen from './src/screens/RideDetailsScreen';

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFFFF' },
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MyRides" component={MyRidesScreen} />
          <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
