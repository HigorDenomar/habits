import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { Habit } from '../screens/Habit';
import { New } from '../screens/New';

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={Home} />
      <Stack.Screen name='habit' component={Habit} />
      <Stack.Screen name='new' component={New} />
    </Stack.Navigator>
  );
}
