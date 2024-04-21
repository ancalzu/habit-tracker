import { LogChallengeProgressCommand } from './logChallengeProgressCommand'
import { EventPublisher } from '../../domain/Events/EventPublisher'
import { Challenge } from '../../domain/Events/challenge/challenge'
import { DomainEvent } from '../../domain/Events/DomainEvent'

export class LogChallengeProgressCommandHandler {
  constructor(readonly eventPublisher: EventPublisher) {}

  handle(command: LogChallengeProgressCommand): void {
    const challengesStream = this.eventPublisher.findChallengesStartedByHabitId(
      command.habitId,
    )
    const events: DomainEvent[] = []

    challengesStream.forEach((stream) => {
      const challenge = Challenge.addProgress(
        stream,
        command.userId,
        command.progress,
      )
      events.push(...challenge.releaseEvents())
    })

    this.eventPublisher.publish(events)
  }
}
