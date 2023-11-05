import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { Home } from './src/screens/Home';
import LoginForm from './src/screens/LoginForm';
import RegistrationForm from './src/screens/RegistrationForm';

NativeWindStyleSheet.setOutput({
  web: 'css',
  default: 'native'
});

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-200">
      <Text className="text-lg text-black font-bold tracking-wide bg-white w-full pl-[45] pb-2 pt-10">Movie Info</Text>
      <ScrollView>
        <RegistrationForm/>
        {/* <LoginForm /> */}
        {/* <Home /> */}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

