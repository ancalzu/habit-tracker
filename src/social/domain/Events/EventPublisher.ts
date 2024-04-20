import { DomainEvent } from './domainEvent'
import { ChallengeId } from '../../core/domain/challenge/challengeId'

export interface EventPublisher {
  publish(events: DomainEvent[]): void

  findChallengeStartedById(id: ChallengeId): DomainEvent
}
