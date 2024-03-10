import { User } from './user'

export interface UserRepository {
  saveUser(user: User): void
  findByUsername(username: string): User | undefined
}

export const UserRepository = Symbol('UserRepository')
