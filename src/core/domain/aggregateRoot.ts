import { DomainEvent } from './domainEvent'

export class AggregateRoot {
  private events: DomainEvent[] = []

  protected recordEvent(event: DomainEvent): void {
    this.events.push(event)
  }

  public releaseEvents(): DomainEvent[] {
    const events = this.events
    this.events = []
    return events
  }
}
