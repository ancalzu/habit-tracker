import { Body, Controller, Post, Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from './error.handler'
import { CreateProgressCommandHandler } from 'src/core/application/progress/create-progress.command-handler'
import { CreateProgressCommand } from 'src/core/application/progress/create-progress.command'

export class CreateProgressDto {
  habitId: string
  registryDate: Date
  notes: string
}

@Controller()
export class CreateProgressController {
  constructor(private commandHandler: CreateProgressCommandHandler) {}

  @Post('progress')
  handle(@Body() request: CreateProgressDto, @Res() response: Response) {
    const id = uuidv4()

    try {
      this.commandHandler.handle(
        new CreateProgressCommand(
          id,
          request.habitId,
          request.registryDate,
          request.notes,
        ),
      )
    } catch (error) {
      catchError(error, response)
      return
    }
    response.set('Location', `/progress/${id}`).send()
  }
}
