import { OnEvent } from '@nestjs/event-emitter'
import { ChallengeCompletedEvent } from './complete-challenge.event'
import { CreateGoalCommand } from '../goal/create-goal.command'
import { GoalRepository } from 'src/core/domain/goal/goal.repository'
import { Inject } from '@nestjs/common'

export class ChallengeEventsHandler {
  constructor(
    @Inject(GoalRepository)
    private readonly goalrepository: GoalRepository,
  ) {}
  @OnEvent('challenge.completed')
  handleChallengeCompletedEvent(event: ChallengeCompletedEvent) {
    console.log(`Challenge Completed: ${event.challengeId} by ${event.userId}`)
    try {
      const goal = new CreateGoalCommand(
        event.challengeId,
        event.userId,
        event.dateAchieved,
      )
      this.goalrepository.save(goal)
    } catch (e) {
      console.error(e)
    }
  }
}
