import { Inject, Injectable } from '@nestjs/common'
import { CreateGoalCommand } from './create-goal.command'
import { Goal } from 'src/core/domain/goal/goal'
import { GoalRepository } from 'src/core/domain/goal/goal.repository'

@Injectable()
export class CreateGoalCommandHandler {
  constructor(
    @Inject(GoalRepository)
    private readonly goalrepository: GoalRepository,
  ) {}

  handle(command: CreateGoalCommand): void {
    const goal = Goal.create(
      command.challengeId,
      command.userId,
      command.completeDate,
    )
    console.log(goal)
    this.goalrepository.save(goal)
  }
}
