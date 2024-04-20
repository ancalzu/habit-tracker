export class UpdateStatusHabitCommand {
  idHabt: string
  status: boolean

  constructor(idHabit: string, status: boolean) {
    this.idHabt = idHabit
    this.status = status
  }
}
