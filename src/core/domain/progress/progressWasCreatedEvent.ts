import { DomainEvent } from '../domainEvent'
import { Progress } from './progress'
import { ProgressId } from './progressId'

export type ProgressWasCreatedPayload = {
  id: string
  habitId: string
  date: Date
}

export class ProgressWasCreatedEvent extends DomainEvent<ProgressWasCreatedPayload> {
  private constructor(id: ProgressId, payload: ProgressWasCreatedPayload) {
    super(id, ProgressWasCreatedEvent.name, payload)
  }

  static fromProgress(progress: Progress): ProgressWasCreatedEvent {
    return new ProgressWasCreatedEvent(progress.id, {
      id: progress.id.value,
      habitId: progress.habitId,
      date: progress.registryDate.value,
    })
  }
}
