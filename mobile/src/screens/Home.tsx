import { View, Text } from 'react-native';
import { Header } from '../components/Header';

export function Home() {
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />

      <Text className='text-white'>Hello World!</Text>
    </View>
  );
}