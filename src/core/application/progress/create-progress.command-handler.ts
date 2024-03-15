import { Inject, Injectable } from '@nestjs/common'
import { CreateProgressCommand } from './create-progress.command'
import { ProgressRepository } from 'src/core/domain/progress/progress.repository'
import { Progress } from 'src/core/domain/progress/progress'
import { Challenge } from 'src/core/domain/challenge/challenge'
import { Goal } from 'src/core/domain/goal/goal'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { GoalRepository } from 'src/core/domain/goal/goal.repository'

@Injectable()
export class CreateProgressCommandHandler {
  constructor(
    @Inject(ProgressRepository)
    private readonly progressrepository: ProgressRepository,
    @Inject(ChallengeRepository)
    private readonly ChallengeRepository: ChallengeRepository,
    @Inject(GoalRepository)
    private readonly GoalRepository: GoalRepository,
  ) {}

  handle(command: CreateProgressCommand): void {
    const progress = Progress.create(command.habitId, command.registryDate)
    this.progressrepository.save(progress)

    const challengesByHabit = this.ChallengeRepository.listChallengeByHabit(
      command.habitId,
    )

    //TODO: VALIDATE IF HABIT EXIST, AND IF EXSIT RETURN USERID
    const hasHabit = findbyId

    challengesByHabit.forEach((challenge) => {
      challenge.startDate < command.registryDate &&
        challenge.limitDate > command.registryDate
      const statusChallenge = Challenge.completeChallenge(challenge)
      //TODO: VALIDAR QUQE EL HABITO EXISTA PARA ENVIARLO EN EL GOAL
      if (statusChallenge === 'complete') {
        const goal = Goal.create(
          challenge.habitId,
          progress.userId,
          progress.registryDate,
        )
        this.GoalRepository.save(goal)
      }
    })
  }
}
