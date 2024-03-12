import { Progress } from './progress'

export interface ProgressRepository {
  save(id: Progress): void
}

export const ProgressRepository = Symbol('ProgressRepository')
