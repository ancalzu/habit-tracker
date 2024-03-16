import { Body, Controller, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import { catchError } from './error.handler'
import { CancelChallengeCommandHandler } from 'src/core/application/challenge/cancel-challenge.command-handler'
import { CancelChallengeCommand } from 'src/core/application/challenge/cancel-challenge.command'

export class CancelChallengeDto {
  id: string
}

@Controller()
export class CancelChallengeController {
  constructor(private cancelchallengeCommand: CancelChallengeCommandHandler) {}

  @Put('challenge')
  handle(@Body() request: CancelChallengeDto, @Res() response: Response) {
    try {
      this.cancelchallengeCommand.handle(new CancelChallengeCommand(request.id))
    } catch (error) {
      catchError(error, response)
      return
    }
    response.set('Location', `/challenge/${request.id}`).send()
  }
}
