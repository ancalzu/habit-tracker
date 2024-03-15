import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ChallengeCompletedEvent } from './complete-challenge.event'
import { Goal } from 'src/core/domain/goal/goal'

@Injectable()
export class ChallengeEventsHandler {
  @OnEvent('challenge.completed')
  handleChallengeCompletedEvent(event: ChallengeCompletedEvent) {
    console.log(`Challenge Completed: ${event.challengeId} by ${event.userId}`)
    const goal = Goal.create(
      event.challengeId,
      event.userId,
      event.dateAchieved,
    )
    console.log(`Goal created: ${goal}`)
  }
}
