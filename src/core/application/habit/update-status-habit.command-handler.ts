import { HabitRepository } from '../../domain/habit/habit.repository'
import { Inject, Injectable } from '@nestjs/common'
import { UpdateStatusHabitCommand } from './update-status-habit.command'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ChallengeRepository } from 'src/core/domain/challenge/challenge.repository'
import { UpdateStatusEvent } from '../events/update-status.event'

@Injectable()
export class UpdateStatusCommandHandler {
  constructor(
    @Inject(HabitRepository)
    private readonly habitrepository: HabitRepository,
    @Inject(ChallengeRepository)
    private readonly challengerepository: ChallengeRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async handle(command: UpdateStatusHabitCommand): Promise<void> {
    const habit = await this.habitrepository.findById(command.idHabt)
    habit.status = command.status
    this.habitrepository.save(habit)

    const challenges = await this.challengerepository.findChallengesByHabitId(
      command.idHabt,
    )
    if (challenges.length >= 1) {
      challenges.forEach((challenge) => {
        if (challenge.status !== 'suspended') {
          const challengeEvent = new UpdateStatusEvent(challenge.id)
          this.eventEmitter.emit('challenge.suspended', challengeEvent)
        }
      })
    }
  }
}
