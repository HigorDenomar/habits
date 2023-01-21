export function generateProgressPercentage(amount: number, completed: number) {
  return !!amount ? Math.round((completed / amount) * 100) : 0;
}
