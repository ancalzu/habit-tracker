export class Progress {
  constructor(
    readonly id: string,
    readonly registryDate: Date,
    readonly notes: string,
  ) {}

  static create(
    habitId: string,
    registry: Date,
    notesProgress: string,
  ): Progress {
    const ProgressHabitId = habitId
    const registryDate = registry
    const notes = notesProgress

    return new Progress(ProgressHabitId, registryDate, notes)
  }
}
