import { CreateHabitCommandHandler } from '../../application/habit/create-habit.command-handler'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { CreateHabitCommand } from '../../application/habit/create-habit.command'
import { Response } from 'express'
import { catchError } from './error.handler'
import { UserId } from 'src/core/domain/user/userId'

export class CreateHabitDto {
  id: string
  name: string
  description: string
  frequency: number
  duration: number
  restTime: number
  userId: string
  wearableDeviceIdHabit: string
  status: string
}

export class UpdateHabitDto {
  habitId: string
  status: string
}

@Controller()
export class CreateHabitController {
  constructor(private commandHandler: CreateHabitCommandHandler) {}

  @Post('habit')
  handle(@Body() request: CreateHabitDto, @Res() response: Response) {
    const id = UserId.create(request.id)
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
      wearableDeviceIdHabit: request.wearableDeviceIdHabit,
      status: request.status,
    }

    try {
      this.commandHandler.handle(new CreateHabitCommand(params))
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habit/${request.id}`).send()
  }
}
