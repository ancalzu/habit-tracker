import { Challenge } from './challenge'

export interface ChallengeRepository {
  save(challenge: Challenge): void
  listChallengeByHabit(habitId: string): Challenge[]
}

export const ChallengeRepository = Symbol('ChallengeRepository')
