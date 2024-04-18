import { DomainEvent } from '../domainEvent'
import { GoalId } from './GoalId'
import { Goal } from './Goal'

export type GoalWasCreatedPayload = {
  id: string
  challengeId: string
  userId: string
  date: Date
}

export class GoalWasCreatedEvent extends DomainEvent<GoalWasCreatedPayload> {
  private constructor(id: GoalId, payload: GoalWasCreatedPayload) {
    super(id, GoalWasCreatedEvent.name, payload)
  }

  static fromGoal(Goal: Goal): GoalWasCreatedEvent {
    return new GoalWasCreatedEvent(Goal.id, {
      ...Goal,
      id: Goal.id.value,
      date: new Date(),
    })
  }
}
