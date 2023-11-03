import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { Home } from './src/screens/Home';

NativeWindStyleSheet.setOutput({
  web: 'css',
  default: 'native'
});

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-200 py-12">
      <Text className="bg-red-300">Hello</Text>
        <Home/>
      <StatusBar style="auto" />
    </View>
  );
}

