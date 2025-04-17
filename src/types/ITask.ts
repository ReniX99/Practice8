export const priorities = {
  Hard: 'Высокий',
  Medium: 'Средний',
  Low: 'Низкий',
}

export interface ITask {
  id: number
  title: string
  date: string
  priority: string
  isActive: boolean
}
