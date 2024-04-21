import { DomainEvent } from '../../domain/Events/domainEvent'
import { EventPublisher } from '../../domain/Events/eventPublisher'
import { ChallengeId } from '../../../core/domain/challenge/challengeId'

export class InMemoryEventPublisher implements EventPublisher {
  publishedEvents: DomainEvent[] = []

  publish(events: DomainEvent[]): void {
    events.forEach((event) => {
      this.publishedEvents.push(event)
    })
  }

  findChallengeStartedById(id: ChallengeId): DomainEvent {
    return this.publishedEvents.find(
      (event) => event.id.equals(id) && event.type === 'ChallengeStarted',
    )
  }

  findChallengesStartedByHabitId(habitId: string): DomainEvent[] {
    return this.publishedEvents.filter(
      (event) =>
        event.payload.habitId === habitId && event.type === 'ChallengeStarted',
    )
  }
}
