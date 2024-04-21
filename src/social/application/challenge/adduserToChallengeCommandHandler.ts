import { AddUsersToChallengeCommand } from './adduserToChallengeCommand'
import { EventPublisher } from '../../domain/Events/EventPublisher'
import { Challenge } from '../../domain/challenge/challenge'
import { ChallengeId } from '../../../core/domain/challenge/challengeId'
import { InvalidChallenge } from '../../domain/challenge/invalid-Challenge'

export class AddUsersToChallengeCommandHandler {
  constructor(readonly eventPublisher: EventPublisher) {}

  handle(command: AddUsersToChallengeCommand): void {
    const challengeId = ChallengeId.create(command.challengeId)
    const challengeStream =
      this.eventPublisher.findChallengeStartedById(challengeId)

    if (!challengeStream) {
      throw InvalidChallenge.withId(command.challengeId)
    }

    const challenge = Challenge.usersAdded(challengeStream, command.users)

    this.eventPublisher.publish(challenge.releaseEvents())
  }
}
