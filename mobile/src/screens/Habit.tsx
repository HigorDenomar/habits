import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import { BackButton } from '../components/BackButton';
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';
import { Loading } from '../components/Loading';
import { api } from '../lib/api';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';
import { HabitsEmpty } from '../components/HabitsEmpty';
import clsx from 'clsx';

interface RouteParams {
  date: string;
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function Habit() {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const [loading, setLoading] = useState(true);

  const { params } = useRoute();
  const { date } = params as RouteParams;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());

  const habitProgress = habitsInfo?.possibleHabits.length
    ? generateProgressPercentage(
        habitsInfo.possibleHabits.length,
        habitsInfo.completedHabits.length
      )
    : 0;

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      const isHabitAlreadyCompleted =
        habitsInfo!.completedHabits.includes(habitId);

      let completedHabits: string[] = [];

      if (isHabitAlreadyCompleted) {
        completedHabits = habitsInfo!.completedHabits.filter(
          id => id !== habitId
        );
      } else {
        completedHabits = [...habitsInfo!.completedHabits, habitId];
      }

      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits: completedHabits,
      });
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível mudar o status do hábito');
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      setLoading(true);

      api
        .get('/day', {
          params: { date },
        })
        .then(response => setHabitsInfo(response.data));
    } catch (error) {
      Alert.alert(
        'Ops',
        'Não foi possível carregar as informações dos hábitos'
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

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

        <ProgressBar progress={habitProgress} />

        <View
          className={clsx('mt-6', {
            'opacity-50': isDateInPast,
          })}
        >
          {habitsInfo?.possibleHabits.length ? (
            habitsInfo?.possibleHabits.map(habit => (
              <CheckBox
                title={habit.title}
                checked={habitsInfo.completedHabits.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.id)}
                key={habit.id}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {isDateInPast ? (
          <Text className='text-white mt-10 text-center'>
            *Você não pode editar hábitos de uma data passada
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}
