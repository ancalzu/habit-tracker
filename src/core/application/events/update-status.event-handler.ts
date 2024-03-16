import { OnEvent } from '@nestjs/event-emitter'
import { Inject } from '@nestjs/common'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { UpdateStatusChallengeCommand } from '../challenge/update-status-challenge.command'
import { UpdateStatusChallengeCommandHandler } from '../challenge/update-status-challenge.command-handler'
import { UpdateStatusEvent } from './update-status.event'

export class UpdateEventsHandler {
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengerepository: ChallengeRepository,
    private updatestatuscommandHandler: UpdateStatusChallengeCommandHandler,
  ) {}
  @OnEvent('challenge.suspended')
  handleChallengeCompletedEvent(event: UpdateStatusEvent) {
    console.log(`Challenge suspended: ${event.challengeId}`)
    try {
      this.updatestatuscommandHandler.handle(
        new UpdateStatusChallengeCommand(event.challengeId),
      )
      // const challenge = new CreateChallengeCommand(
      //   event.,
      //   event.userId,
      //   event.dateAchieved,
      // )
      //this.challengerepository.save(challenge)
      console.log('')
    } catch (e) {
      console.error(e)
    }
  }
}
