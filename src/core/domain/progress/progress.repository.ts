import { Progress } from './progress'

export interface ProgressRepository {
  save(progress: Progress): void
}

export const ProgressRepository = Symbol('ProgressRepository')
