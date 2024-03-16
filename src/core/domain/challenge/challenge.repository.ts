import { Challenge } from './challenge'

export interface ChallengeRepository {
  save(challenge: Challenge): void
  findChallengesByHabitId(habitId: string): Promise<Challenge[]>
}

export const ChallengeRepository = Symbol('ChallengeRepository')
