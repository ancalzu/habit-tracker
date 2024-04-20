import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { UpdateStatusChallengeCommand } from './update-status-challenge.command'

export class UpdateStatusChallengeCommandHandler {
  constructor(private readonly challengerepository: ChallengeRepository) {}

  async handle(command: UpdateStatusChallengeCommand): Promise<void> {
    const challenge = await this.challengerepository.getChallenge(
      command.challengeId,
    )
    challenge.status = 'suspended'
    this.challengerepository.save(challenge)
  }
}
