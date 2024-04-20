import { DomainEvent } from '../../domain/domainEvent'
import { EventPublisher } from '../../domain/eventPublisher'
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
}
