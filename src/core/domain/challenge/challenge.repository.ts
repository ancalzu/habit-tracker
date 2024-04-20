import { Challenge } from './challenge'
import { ChallengeId } from './challengeId'

export interface ChallengeRepository {
  save(challenge: Challenge): void
  findChallengesByHabitId(habitId: string): Promise<Challenge[]>
  findById(id: ChallengeId): Challenge | undefined
  getChallenge(challengeId: string): Promise<Challenge>
  delete(Challenge: Challenge): void
}

export const ChallengeRepository = Symbol('ChallengeRepository')
