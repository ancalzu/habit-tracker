import { OnEvent } from '@nestjs/event-emitter'
import { UpdateStatusEvent } from './update-status.event'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { Inject } from '@nestjs/common'

export class UpdateEventsHandler {
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengerepository: ChallengeRepository,
  ) {}
  @OnEvent('challenge.suspended')
  async handleChallengeCompletedEvent(event: UpdateStatusEvent) {
    console.log(`Challenge suspended: ${event.challengeId}`)
    try {
      const challenge = await this.challengerepository.getChallenge(
        event.challengeId,
      )
      challenge.status = 'suspended'
      this.challengerepository.save(challenge)
      /*TODO: Fix undefined this.updatestatuscommandHandler*/
      //const statuscommand = new UpdateStatusChallengeCommand(event.challengeId)
      //this.updatestatuscommandHandler.handle(statuscommand)
    } catch (e) {
      console.error(e)
    }
  }
}
