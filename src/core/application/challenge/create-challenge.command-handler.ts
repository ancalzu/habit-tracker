import { Inject, Injectable } from '@nestjs/common'
import { CreateChallengeCommand } from './create-challenge.command'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { Challenge } from 'src/core/domain/challenge/challenge'

@Injectable()
export class CreateChallengeCommandHandler {
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengerepository: ChallengeRepository,
  ) {}

  handle(command: CreateChallengeCommand): void {
    const challenge = Challenge.create(
      command.habitId,
      command.description,
      command.iterations,
      command.startDate,
      command.limitDate,
    )
    this.challengerepository.save(challenge)
  }
}
