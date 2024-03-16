import { v4 as uuidv4 } from 'uuid'
export class Progress {
  constructor(
    readonly id: string,
    readonly habitId: string,
    readonly registryDate: Date,
  ) {}

  static create(habitId: string, registry: Date): Progress {
    const id = uuidv4()
    const ProgresshabitId = habitId
    const registryDate = registry

    return new Progress(id, ProgresshabitId, registryDate)
  }
}
