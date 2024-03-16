import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProgressModel } from '../database/models/progress.models'
import { ProgressRepository } from 'src/core/domain/progress/progress.repository'
import { Progress } from 'src/core/domain/progress/progress'

@Injectable()
export class ProgressInMemoryRepository implements ProgressRepository {
  constructor(
    @InjectRepository(ProgressModel)
    private progressRepository: Repository<ProgressModel>,
  ) {}

  save(progress: Progress): void {
    const progressModel = new ProgressModel(
      progress.id,
      progress.habitId,
      progress.registryDate,
    )
    this.progressRepository.save(progressModel)
  }
}
