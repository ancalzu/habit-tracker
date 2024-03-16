export class UpdateStatusHabitCommand {
  idHabt: string
  status: string

  constructor(idHabit: string, status: string) {
    this.idHabt = idHabit
    this.status = status
  }
}
