export class CreateHabitCommand {
  id: string
  name: string
  description: string
  frequency: number
  duration: number
  restTime: number
  userId: string
  wearableDeviceIdHabit: string
  status: string

  constructor(params: {
    name: string
    frequency: number
    duration: number
    restTime: number
    userId: string
    wearableDeviceIdHabit: string
    status: string
  }) {
    this.name = params.name
    this.frequency = params.frequency
    this.duration = params.duration
    this.restTime = params.restTime
    this.userId = params.userId
    this.wearableDeviceIdHabit = params.wearableDeviceIdHabit
    this.status = params.status
  }
}
