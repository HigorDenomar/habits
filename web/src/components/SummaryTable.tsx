import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] as const;

export function SummaryTable() {
  const summaryDays = generateRangeDatesFromYearStart();
  const minimumSummaryDatesSize = 18 * 7; // 18 weeks
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDays.length;

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
        {summaryDays.map(day => (
          <HabitDay key={day.toString()} />
        ))}

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
