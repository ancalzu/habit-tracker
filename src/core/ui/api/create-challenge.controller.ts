import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { catchError } from './error.handler'
import { CreateChallengeCommandHandler } from 'src/core/application/challenge/create-challenge.command-handler'
import { CreateChallengeCommand } from 'src/core/application/challenge/create-challenge.command'
import { ChallengeId } from 'src/core/domain/challenge/challengeId'

export class CreateChallengeDto {
  id: string
  habitId: string
  description: string
  iterations: number
  startDate: Date
  limitDate: Date
  status: string
  currentIterationNumber: number
}

@Controller()
export class CreateChallengeController {
  constructor(private commandHandler: CreateChallengeCommandHandler) {}

  @Post('challenge')
  handle(@Body() request: CreateChallengeDto, @Res() response: Response) {
    const id = ChallengeId.create(request.id)

    try {
      this.commandHandler.handle(
        new CreateChallengeCommand(
          id,
          request.habitId,
          request.description,
          request.iterations,
          request.startDate,
          request.limitDate,
          request.status,
          request.currentIterationNumber,
        ),
      )
    } catch (error) {
      catchError(error, response)
      return
    }
    response.set('Location', `/challenge/${request.id}`).send()
  }
}
