/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common'
import { CreateProgressCommand } from './create-progress.command'
import { ProgressRepository } from 'src/core/domain/progress/progress.repository'
import { Progress } from 'src/core/domain/progress/progress'
import { Challenge } from 'src/core/domain/challenge/challenge'
import { Goal } from 'src/core/domain/goal/goal'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { GoalRepository } from 'src/core/domain/goal/goal.repository'
import { HabitRepository } from 'src/core/domain/habit/habit.repository'
import { ChallengeCompletedEvent } from '../events/complete-challenge.event'
import { EventEmitter2 } from 'eventemitter2'
@Injectable()
export class CreateProgressCommandHandler {
  constructor(
    @Inject(ProgressRepository)
    private readonly progressrepository: ProgressRepository,
    @Inject(ChallengeRepository)
    private readonly ChallengeRepository: ChallengeRepository,
    @Inject(GoalRepository)
    private readonly GoalRepository: GoalRepository,
    @Inject(HabitRepository)
    private readonly HabitRepository: HabitRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  handle(command: CreateProgressCommand): void {
    const progress = Progress.create(command.habitId, command.registryDate)
    this.progressrepository.save(progress)

    const challengesByHabit = this.ChallengeRepository.findChallengesByHabitId(
      command.habitId,
    )

    /*As long as I solve the problem with Async await we will use dummy values*/
    const habitUserId = 'a664dcf8-2c8b-41b4-98af-0cf6f0378981'
    const challengeMock = {
      id: '1',
      habitId: '1309f9b3-0948-4c43-b766-69ba0bcd82c3',
      limitDate: new Date('2021-07-01'),
      startDate: new Date('2021-06-01'),
      description: 'description',
      iterations: 1,
      status: 'pending',
      currentIterations: 1,
    }
    const registryDate: Date = new Date(command.registryDate)
    if (
      challengeMock.startDate < registryDate &&
      challengeMock.limitDate > registryDate &&
      challengeMock.status === 'pending'
    ) {
      const challengeEvent = new ChallengeCompletedEvent(
        challengeMock.id,
        habitUserId,
        command.registryDate,
      )
      this.eventEmitter.emit('challenge.completed', challengeEvent)
    }
    //TODO: FIX ASYNC AWAIT PROMISE
    // challengesByHabit2.forEach((challenge) => {
    //   challengeMock.startDate < command.registryDate &&
    //     challengeMock.limitDate > command.registryDate
    //   const statusChallenge = Challenge.completeChallenge(challenge)
    //   console.log(statusChallenge)
    //   if (statusChallenge === 'complete') {
    //     const goal = Goal.create(
    //       challenge.habitId,
    //       habitUserId,
    //       progress.registryDate,
    //     )
    //     this.GoalRepository.save(goal)
    //   }
    // })
  }
}
