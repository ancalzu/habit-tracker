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

  save(challenge: Challenge): void {
    const challengeModel = new ChallengeModel(
      challenge.id,
      challenge.habitId,
      challenge.description,
      challenge.iterations,
      challenge.startDate,
      challenge.limitDate,
    )
    this.postRepository.save(challengeModel)
  }
}
