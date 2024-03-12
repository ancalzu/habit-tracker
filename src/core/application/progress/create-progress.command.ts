export class CreateProgressCommand {
  id: string
  habitId: string
  registryDate: Date
  notes: string

  constructor(id: string, habitId: string, registryDate: Date, notes: string) {
    this.id = id
    this.habitId = habitId
    this.registryDate = registryDate
    this.notes = notes
  }
}
