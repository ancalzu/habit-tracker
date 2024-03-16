import { v4 as uuidv4 } from 'uuid'
export class Goal {
  constructor(
    readonly id: string,
    readonly challengeId: string,
    readonly userId: string,
    readonly completeDate: Date,
  ) {}

  static create(challenge: string, user: string, finishDate: Date): Goal {
    const id = uuidv4()
    const challengeId = challenge
    const userId = user
    const completeDate = finishDate

    return new Goal(id, challengeId, userId, completeDate)
  }
}
