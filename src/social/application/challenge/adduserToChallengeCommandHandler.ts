import { AddUsersToChallengeCommand } from './adduserToChallengeCommand'
import { EventPublisher } from '../../domain/eventPublisher'
import { Challenge } from '../../domain/challenge/challenge'
import { ChallengeId } from '../../../core/domain/challenge/challengeId'
import { ChallengeNotFoundError } from '../../challengeNotFoundError'

export class AddUsersToChallengeCommandHandler {
  constructor(readonly eventPublisher: EventPublisher) {}

  handle(command: AddUsersToChallengeCommand): void {
    const challengeId = ChallengeId.create(command.challengeId)
    const challengeStream =
      this.eventPublisher.findChallengeStartedById(challengeId)

    if (!challengeStream) {
      throw ChallengeNotFoundError.withId(command.challengeId)
    }

    const challenge = Challenge.usersAdded(challengeStream, command.users)

    this.eventPublisher.publish(challenge.releaseEvents())
  }
}
