import { CreateGoalCommand } from './create-goal.command'
import { Goal } from 'src/core/domain/goal/goal'
import { GoalRepository } from 'src/core/domain/goal/goal.repository'

export class CreateGoalCommandHandler {
  constructor(private readonly goalrepository: GoalRepository) {}

  handle(command: CreateGoalCommand): void {
    const goalId = command.id
    const goal = Goal.create(
      goalId,
      command.challengeId,
      command.userId,
      command.completeDate,
    )
    this.goalrepository.save(goal)
  }
}
