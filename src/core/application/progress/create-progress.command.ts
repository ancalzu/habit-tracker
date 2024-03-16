export class CreateProgressCommand {
  id: string
  habitId: string
  registryDate: Date

  constructor(id: string, habitId: string, registryDate: Date) {
    this.id = id
    this.habitId = habitId
    this.registryDate = registryDate
  }
}
