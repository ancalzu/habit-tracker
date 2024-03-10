export class CreateHabitCommand {
  id: string
  name: string
  description: string
  frequency: number
  duration: number
  restTime: number
  userId: string

  constructor(params: {
    name: string
    frequency: number
    duration: number
    restTime: number
    userId: string
  }) {
    this.name = params.name
    this.frequency = params.frequency
    this.duration = params.duration
    this.restTime = params.restTime
    this.userId = params.userId
  }
}
