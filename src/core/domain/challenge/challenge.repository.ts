import { Challenge } from './challenge'

export interface ChallengeRepository {
  save(challenge: Challenge): void
}

export const ChallengeRepository = Symbol('ChallengeRepository')
