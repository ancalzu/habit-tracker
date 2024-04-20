import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AddUsersToChallengeCommand } from '../../application/challenge/addUsersToChallengeCommand'
import { catchError } from '../../../core/ui/api/errorHandler'
import { AddUsersToChallengeCommandHandler } from '../../application/challenge/addUsersToChallengeCommandHandler'

interface AddUsersToChallengeDto {
  challengeId: string
  users: string[]
}

@Controller()
export class AddUsersToChallengeController {
  constructor(private commandHandler: AddUsersToChallengeCommandHandler) {}

  @Post('add-users')
  handle(@Body() request: AddUsersToChallengeDto, @Res() response: Response) {
    try {
      this.commandHandler.handle(
        new AddUsersToChallengeCommand(request.challengeId, request.users),
      )
    } catch (error) {
      catchError(error, response)
      return
    }
  }
}
