import { CreateChallengeCommand } from './create-challenge.command'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { Challenge } from 'src/core/domain/challenge/challenge'
import { HabitRepository } from 'src/core/domain/habit/habit.repository'
import { HabitNotFoundError } from '../habit/habitNotFoundError'
import { HabitId } from 'src/core/domain/habit/habit.id'

export class CreateChallengeCommandHandler {
  constructor(
    private readonly challengerepository: ChallengeRepository,
    private readonly habitRepository: HabitRepository,
  ) {}

  handle(command: CreateChallengeCommand): void {
    const habitId = HabitId.create(command.habitId)

    if (this.habitRepository.findById(habitId)) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const challenge = Challenge.create(
      command.id.value,
      habitId.value,
      command.description,
      command.iterations,
      command.startDate,
      command.limitDate,
      command.status,
      command.currentIterations,
    )
    this.challengerepository.save(challenge)
  }
}
