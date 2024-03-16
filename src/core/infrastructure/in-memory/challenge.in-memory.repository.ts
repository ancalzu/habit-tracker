import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Challenge } from 'src/core/domain/challenge/challenge'
import { ChallengeModel } from '../database/models/challenge.models'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
@Injectable()
export class ChallengeInMemoryRepository implements ChallengeRepository {
  constructor(
    @InjectRepository(ChallengeModel)
    private postRepository: Repository<ChallengeModel>,
  ) {}

  listAll(): Challenge[] {
    throw new Error('Method not implemented.')
  }

  challenges: Challenge[] = []

  // listChallengeByHabit(habitId: string): Challenge[] {
  //   let challengesList: Challenge[] = []
  //   challengesList = this.challenges.filter(
  //     (challenge) => challenge.habitId === habitId,
  //   )
  //   return challengesList
  // }

  async findChallengesByHabitId(habitId: string): Promise<Challenge[]> {
    try {
      const challengeModels = await this.postRepository.find({
        where: { habitId: habitId },
      })
      const challenges = challengeModels.map((model) => {
        const challenge: Challenge = {
          id: model.id,
          habitId: model.habitId,
          description: model.description,
          iterations: model.iterations,
          startDate: model.startDate,
          limitDate: model.limitDate,
          status: model.status,
          currentIterations: 0,
        }
        return challenge
      })
      return challenges
    } catch (error) {
      console.error('Error al obtener los retos:', error)
      throw new Error('Error al obtener los retos')
    }
  }

  async getChallenge(challengeId: string): Promise<Challenge> {
    try {
      const challengeModel = await this.postRepository.find({
        where: { id: challengeId },
      })
      const challenge: Challenge = {
        id: challengeModel[0].id,
        habitId: challengeModel[0].habitId,
        description: challengeModel[0].description,
        iterations: challengeModel[0].iterations,
        startDate: challengeModel[0].startDate,
        limitDate: challengeModel[0].limitDate,
        status: challengeModel[0].status,
        currentIterations: challengeModel[0].iterations,
      }
      return challenge
    } catch (error) {
      console.error('Error al obtener el reto:', error)
      throw new Error('Error al obtener el reto')
    }
  }

  save(challenge: Challenge): void {
    const challengeModel = new ChallengeModel(
      challenge.id,
      challenge.habitId,
      challenge.description,
      challenge.iterations,
      challenge.startDate,
      challenge.limitDate,
      challenge.status,
    )
    this.postRepository.save(challengeModel)
  }
}
