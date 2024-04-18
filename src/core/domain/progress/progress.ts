import { v4 as uuidv4 } from 'uuid'
import { ProgressDate } from './progressDate'
import { ProgressId } from './progressId'
export class Progress {
  constructor(
    readonly id: ProgressId,
    readonly habitId: string,
    readonly registryDate: ProgressDate,
  ) {}

  static create(habitId: string, registry: Date): Progress {
    const id = uuidv4()
    const ProgresshabitId = habitId
    const registryDate = ProgressDate.create(registry)

    return new Progress(id, ProgresshabitId, registryDate)
  }
}
