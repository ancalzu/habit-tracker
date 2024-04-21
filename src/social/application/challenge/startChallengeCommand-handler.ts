import { StartChallengeCommand } from './startChallengeCommand'
import { HabitRepository } from '../../../core/domain/habit/habit.repository'
import { EventPublisher } from '../../domain/events/eventPublisher'
import { HabitNotFoundError } from '../../../core/application/habit/habitNotFoundError'
import { Challenge } from '../../domain/challenge/challenge'
import { HabitId } from '../../../core/domain/habit/habit.id'

export class StartChallengeCommandHandler {
  constructor(
    readonly habitRepository: HabitRepository,
    readonly eventPublisher: EventPublisher,
  ) {}

  handle(command: StartChallengeCommand): void {
    const habitId = HabitId.create(command.habitId)

    if (!this.habitRepository.findById(habitId)) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const challenge = Challenge.createStarted(
      command.id,
      habitId,
      command.target,
      command.partner,
      command.project,
      command.cost,
      command.deadline,
      command.users,
    )

    this.eventPublisher.publish(challenge.releaseEvents())
  }
}
