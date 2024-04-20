import { OnEvent } from '@nestjs/event-emitter'
import { ChallengeCompletedEvent } from './complete-challenge.event'
import { EventPublisher } from '../../domain/events/eventPublisher'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { ChallengeId } from 'src/core/domain/challenge/challengeId'
import { GoalId } from 'src/core/domain/goal/goalId'

export class ChallengeEventsHandler {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    readonly eventPublisher: EventPublisher,
  ) {}
  @OnEvent('challenge.completed')
  handleChallengeCompletedEvent(event: ChallengeCompletedEvent) {
    console.log(`Challenge Completed: ${event.challengeId} by ${event.userId}`)
    const challengeId = ChallengeId.create(event.challengeId)
    const goalId = GoalId.create(event.id)
    const challenge = this.challengeRepository.findById(challengeId)

    try {
      challenge.generateGoal(
        goalId,
        event.userId,
        event.progress,
        event.dateAchieved,
        challengeId,
      )
      this.eventPublisher.publish(challenge.releaseEvents())
    } catch (e) {
      console.error(e)
    }
  }
}
