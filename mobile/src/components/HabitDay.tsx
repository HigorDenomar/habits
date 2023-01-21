import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from 'react-native';
import clsx from 'clsx';

import { generateProgressPercentage } from '../utils/generate-progress-percentage';
import dayjs from 'dayjs';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  amount?: number;
  completed?: number;
  date: Date;
}

export function HabitDay({
  amount = 0,
  completed = 0,
  date,
  ...props
}: HabitDayProps) {
  const progressPercentage =
    completed > 0 ? generateProgressPercentage(amount, completed) : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today, 'day');

  return (
    <TouchableOpacity
      className={clsx('rounded-lg m-1 border-2', {
        'bg-zinc-900 border-zinc-800': progressPercentage === 0,
        'bg-violet-900 border-violet-700':
          progressPercentage > 0 && progressPercentage < 20,
        'bg-violet-800 border-violet-600':
          progressPercentage >= 20 && progressPercentage < 40,
        'bg-violet-700 border-violet-500':
          progressPercentage >= 40 && progressPercentage < 60,
        'bg-violet-600 border-violet-500':
          progressPercentage >= 60 && progressPercentage < 80,
        'bg-violet-500 border-violet-400': progressPercentage >= 80,
        'border-zinc-300 border-2': isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...props}
    />
  );
}
