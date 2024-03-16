import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GoalRepository } from 'src/core/domain/goal/goal.repository'
import { GoalModel } from '../database/models/goal.models'
import { Goal } from 'src/core/domain/goal/goal'

@Injectable()
export class GoalInMemoryRepository implements GoalRepository {
  constructor(
    @InjectRepository(GoalModel)
    private goalRepository: Repository<GoalModel>,
  ) {}

  save(goal: Goal): void {
    const goalModel = new GoalModel(
      goal.challengeId,
      goal.userId,
      goal.completeDate,
    )
    this.goalRepository.save(goalModel)
  }
}
