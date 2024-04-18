import { DomainEvent } from '../domainEvent'

export interface EventPublisher {
  publish(events: DomainEvent[]): void
}

export const eventPublisher = Symbol('EventPublisher')
