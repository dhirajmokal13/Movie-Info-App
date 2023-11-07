import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import Footer from './src/components/Footer';
import { Home } from './src/screens/Home';
import LoginForm from './src/screens/LoginForm';
import RegistrationForm from './src/screens/RegistrationForm';
import MovieDetails from './src/screens/MovieDetails';

NativeWindStyleSheet.setOutput({
  web: 'css',
  default: 'native'
});

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-200">
      <Text className="text-lg text-black font-bold tracking-wide bg-white w-full pl-[45] pb-2 pt-11">Movie Info</Text>
      <ScrollView>
        <Home/>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

