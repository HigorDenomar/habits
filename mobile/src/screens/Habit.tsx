import { useRoute } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import { BackButton } from '../components/BackButton';
import dayjs from 'dayjs';
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';

interface RouteParams {
  date: string;
}

export function Habit() {
  const { params } = useRoute();
  const { date } = params as RouteParams;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <BackButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>
        <Text className='mt-6 text-white font-extrabold text-3xl lowercase'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={40} />

        <View className='mt-6'>
          <CheckBox title='Dormir 8h' checked={true} />
          <CheckBox title='Beber 2L de água' checked={true} />
          <CheckBox title='Caminhar' checked={false} />
        </View>
      </ScrollView>
    </View>
  );
}
