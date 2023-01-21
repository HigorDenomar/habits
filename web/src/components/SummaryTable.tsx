import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] as const;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);
  const summaryDates = generateRangeDatesFromYearStart();
  const minimumSummaryDatesSize = 18 * 7; // 18 weeks
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

  useEffect(() => {
    api.get('/summary').then(response => setSummary(response.data));
  }, []);

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className='text-zinc-400 text-xl font-bold h-10 w-10 flex items justify-center'
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summaryDates.map(date => {
          const dayInSummary = summary.find(day =>
            dayjs(date).isSame(day.date, 'day')
          );

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
        })}

        {amountOfDaysToFill > 0
          ? Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <div
                key={index}
                className='bg-zinc-900 w-10 h-10 rounded-lg border-2 border-zinc-800 opacity-40 cursor-not-allowed'
              />
            ))
          : null}
      </div>
    </div>
  );
}
