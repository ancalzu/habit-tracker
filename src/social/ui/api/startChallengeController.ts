import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { StartChallengeCommandHandler } from '../../application/challenge/startChallengeCommandHandler'
import { ChallengeId } from '../../../core/domain/challenge/challengeId'
import { StartChallengeCommand } from '../../application/challenge/startChallengeCommand'
import { catchError } from '../../../core/ui/api/errorHandler'

interface StartChallengeDto {
  habitId: string
  target: number
  partner: string
  project: string
  cost: number
  deadline: Date
  users: string[]
}

@Controller()
export class StartChallengeController {
  constructor(private commandHandler: StartChallengeCommandHandler) {}

  @Post('start-challenge')
  handle(@Body() request: StartChallengeDto, @Res() response: Response) {
    const id = ChallengeId.generate()
    try {
      this.commandHandler.handle(
        new StartChallengeCommand(
          id,
          request.habitId,
          request.target,
          request.partner,
          request.project,
          request.cost,
          request.deadline,
          request.users,
        ),
      )
    } catch (error) {
      catchError(error, response)
      return
    }
  }
}
