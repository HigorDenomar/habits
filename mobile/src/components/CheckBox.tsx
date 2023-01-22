import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import clsx from 'clsx';

interface CheckBoxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function CheckBox({ title, checked = false, ...props }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row mb-2 items-center'
      {...props}
    >
      {checked ? (
        <View className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'>
          <Feather name='check' size={20} color={colors.white} />
        </View>
      ) : (
        <View className='h-8 w-8 bg-zinc-900 rounded-lg' />
      )}

      <Text
        className={clsx('text-white text-base ml-3 font-semibold', {
          'line-through': checked,
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
