import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginProvider } from './src/context/LoginContext';
import { FilterProvider } from './src/context/FiltersContext'

import { Home } from './src/screens/Home';
import LoginForm from './src/screens/LoginForm';
import RegistrationForm from './src/screens/RegistrationForm';
import MovieDetails from './src/screens/MovieDetails';
import Profile from './src/screens/Profile';
import Filters from './src/screens/Filters';
import { FontAwesome } from '@expo/vector-icons';

NativeWindStyleSheet.setOutput({
  web: 'css',
  default: 'native'
});

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <FilterProvider>
      <LoginProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Movie Info">
            <Stack.Screen
              name="Movie Info"
              component={Home}
              options={{
                title: 'Home',
                headerLeft: (props) => (
                  <FontAwesome name="home" size={22} color="black" style={{ marginRight: 10 }} />
                ),
              }}
            />
            <Stack.Screen name="Login" component={LoginForm} />
            <Stack.Screen name="Registration" component={RegistrationForm} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Filters" component={Filters} />
          </Stack.Navigator>
        </NavigationContainer>
      </LoginProvider>
    </FilterProvider>
  );
}

