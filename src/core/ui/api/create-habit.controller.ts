import { CreateHabitCommandHandler } from '../../application/habit/create-habit.command-handler'
import { Body, Controller, Post, Put, Res } from '@nestjs/common'
import { CreateHabitCommand } from '../../application/habit/create-habit.command'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from './error.handler'
import { UpdateStatusHabitCommand } from 'src/core/application/habit/update-status-habit.command'
import { UpdateStatusCommandHandler } from 'src/core/application/habit/update-status-habit.command-handler'

export class CreateHabitDto {
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
  constructor(
    private commandHandler: CreateHabitCommandHandler,
    private updatestatuscommandHandler: UpdateStatusCommandHandler,
  ) {}

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
      wearableDeviceIdHabit: request.wearableDeviceIdHabit,
      status: request.status,
    }

    try {
      this.commandHandler.handle(new CreateHabitCommand(params))
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habit/${id}`).send()
  }

  @Put('habit')
  handlePut(@Body() request: UpdateHabitDto, @Res() response: Response) {
    try {
      this.updatestatuscommandHandler.handle(
        new UpdateStatusHabitCommand(request.habitId, request.status),
      )
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habit/${request.habitId}`).send()
  }
}
