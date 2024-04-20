import { Body, Controller, Put, Res } from '@nestjs/common'
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
  status: boolean
}

@Controller()
export class UpdateStatusController {
  constructor(private updatestatuscommandHandler: UpdateStatusCommandHandler) {}

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
