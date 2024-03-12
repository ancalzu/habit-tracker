export class CreateProgressCommand {
  id: string
  habitId: string
  registryDate: Date
  notes: string

  constructor(habitId: string, registryDate: Date, notes: string) {
    this.habitId = habitId
    this.registryDate = registryDate
    this.notes = notes
  }
}
