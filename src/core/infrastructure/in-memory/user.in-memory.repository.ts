import { User } from 'src/core/domain/user/user'
import { UserRepository } from '../../domain/user/user.repository'
import { UserModel } from '../database/models/users.models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class UserInMemoryRepository implements UserRepository {
  private users: User[] = []

  constructor(
    @InjectRepository(UserModel) private postRepository: Repository<UserModel>,
  ) {}

  saveUser(user: User): void {
    const userModel = new UserModel(
      user.id,
      user.username,
      user.fullname,
      user.email,
      user.createDate,
      user.updateDate,
    )
    this.postRepository.save(userModel)
  }

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username)
  }

  withUsers(users: User[]) {
    this.users = users
  }

  isUserSaved(user: User): boolean {
    return this.users.some((u) => u.id === user.id)
  }

  addUsers(users: User[]): UserInMemoryRepository {
    this.users = users
    return this
  }
}
