import { Inject, Injectable } from '@nestjs/common'
import { CreateProgressCommand } from './create-progress.command'
import { ProgressRepository } from 'src/core/domain/progress/progress.repository'
import { Progress } from 'src/core/domain/progress/progress'

@Injectable()
export class CreateProgressCommandHandler {
  constructor(
    @Inject(ProgressRepository)
    private readonly progressrepository: ProgressRepository,
  ) {}

  handle(command: CreateProgressCommand): void {
    const progress = Progress.create(
      command.habitId,
      command.registryDate,
      command.notes,
    )
    this.progressrepository.save(progress)
  }
}
