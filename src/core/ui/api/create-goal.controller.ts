import { Body, Controller, Post, Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from './error.handler'

export class CreateGoalDto {
  challengeId: string
  registryDate: Date
}

@Controller()
export class CreateGoalController {
  constructor(private commandHandler: CreateGoalCommandHandler) {}

  @Post('goal')
  handle(@Body() request: CreateGoalDto, @Res() response: Response) {
    const id = uuidv4()

    try {
      this.commandHandler.handle(
        new CreateGoalCommand(id, request.challengeId, request.registryDate),
      )
    } catch (error) {
      catchError(error, response)
      return
    }
    response.set('Location', `/goal/${id}`).send()
  }
}
