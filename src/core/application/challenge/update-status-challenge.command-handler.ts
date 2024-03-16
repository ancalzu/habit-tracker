import { Inject, Injectable } from '@nestjs/common'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { UpdateStatusChallengeCommand } from './update-status-challenge.command'
import { EventEmitter2 } from 'eventemitter2'

@Injectable()
export class UpdateStatusChallengeCommandHandler {
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengerepository: ChallengeRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async handle(command: UpdateStatusChallengeCommand): Promise<void> {
    const challenge = await this.challengerepository.getChallenge(
      command.challengeId,
    )
    challenge.status = 'suspended'
    this.challengerepository.save(challenge)
  }
}
