import { v4 as uuidv4 } from 'uuid'
export class Progress {
  constructor(
    readonly id: string,
    readonly habitId: string,
    readonly registryDate: Date,
    readonly notes: string,
  ) {}

  static create(
    habitId: string,
    registry: Date,
    notesProgress: string,
  ): Progress {
    const id = uuidv4()
    const ProgressHabitId = habitId
    const registryDate = registry
    const notes = notesProgress

    return new Progress(id, ProgressHabitId, registryDate, notes)
  }
}
