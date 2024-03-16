import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { CancelChallengeCommand } from './cancel-challenge.command'
import { MissingChallengeError } from './missing-challenge.error'

export class CancelChallengeCommandHandler {
  constructor(private readonly challengerepository: ChallengeRepository) {}

  async handle(command: CancelChallengeCommand): Promise<void> {
    const challenge = await this.challengerepository.getChallenge(command.id)
    if (!challenge) {
      throw MissingChallengeError.withId(command.id)
    }

    if (challenge.status === 'pending' || challenge.status === 'suspended') {
      challenge.status = 'Cancelled'
      this.challengerepository.save(challenge)
    } else {
      throw new Error('Challenge cannot be cancelled')
    }
  }
}
