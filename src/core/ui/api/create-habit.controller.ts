import { CreateHabitCommandHandler } from '../../application/habit/create-habit.command-handler'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { CreateHabitCommand } from '../../application/habit/create-habit.command'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from './error.handler'

export class CreateHabitDto {
  name: string
  description: string
  frequency: number
  duration: number
  restTime: number
  userId: string
}

@Controller()
export class CreateHabitController {
  constructor(private commandHandler: CreateHabitCommandHandler) {}

  @Post('habit')
  handle(@Body() request: CreateHabitDto, @Res() response: Response) {
    const id = uuidv4()
    const createDate = new Date()
    const updateDate = new Date()
    const params = {
      id: id,
      name: request.name,
      frequency: request.frequency,
      duration: request.duration,
      restTime: request.restTime,
      userId: request.userId,
      createDate: createDate,
      updateDate: updateDate,
    }

    try {
      this.commandHandler.handle(new CreateHabitCommand(params))
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habit/${id}`).send()
  }
}
