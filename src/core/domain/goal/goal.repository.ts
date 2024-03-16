import { Goal } from './goal'

export interface GoalRepository {
  save(goal: Goal): void
}

export const GoalRepository = Symbol('GoalRepository')
