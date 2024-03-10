import { Module } from '@nestjs/common'
import { RegisterUserCommandHandler } from './core/application/user/register-user.command-handler'
import { CreateUserController } from './core/ui/api/create-user.controller'
import { UserRepository } from './core/domain/user/user.repository'
import { UserInMemoryRepository } from './core/infrastructure/in-memory/user.in-memory.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from './core/infrastructure/database/models/users.models'
import { HabitModel } from './core/infrastructure/database/models/habit.models'
import { CreateHabitController } from './core/ui/api/create-habit.controller'
import { CreateHabitCommandHandler } from './core/application/habit/create-habit.command-handler'
import { HabitRepository } from './core/domain/habit/habit.repository'
import { HabitInMemoryRepository } from './core/infrastructure/in-memory/habit.in-memory.repository'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserModel, HabitModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserModel]),
    TypeOrmModule.forFeature([HabitModel]),
  ],
  controllers: [CreateUserController, CreateHabitController],
  providers: [
    RegisterUserCommandHandler,
    CreateHabitCommandHandler,
    { provide: UserRepository, useClass: UserInMemoryRepository },
    { provide: HabitRepository, useClass: HabitInMemoryRepository },
  ],
})
export class AppModule {}
