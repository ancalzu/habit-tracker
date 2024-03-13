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
import { ProgressModel } from './core/infrastructure/database/models/progress.models'
import { CreateProgressController } from './core/ui/api/create-progress.controller'
import { ProgressInMemoryRepository } from './core/infrastructure/in-memory/progress.in-memory.repository'
import { ProgressRepository } from './core/domain/progress/progress.repository'
import { CreateProgressCommandHandler } from './core/application/progress/create-progress.command-handler'
import { ChallengeRepository } from './core/domain/challenge/challenge.repository'
import { ChallengeModel } from './core/infrastructure/database/models/challenge.models'
import { CreateChallengeCommandHandler } from './core/application/challenge/create-challenge.command-handler'
import { ChallengeInMemoryRepository } from './core/infrastructure/in-memory/challenge.in-memory.repository'
import { CreateChallengeController } from './core/ui/api/create-challenge.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserModel, HabitModel, ProgressModel, ChallengeModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserModel]),
    TypeOrmModule.forFeature([HabitModel]),
    TypeOrmModule.forFeature([ProgressModel]),
    TypeOrmModule.forFeature([ChallengeModel]),
  ],
  controllers: [
    CreateUserController,
    CreateHabitController,
    CreateProgressController,
    CreateChallengeController,
  ],
  providers: [
    RegisterUserCommandHandler,
    CreateHabitCommandHandler,
    CreateProgressCommandHandler,
    CreateChallengeCommandHandler,
    { provide: UserRepository, useClass: UserInMemoryRepository },
    { provide: HabitRepository, useClass: HabitInMemoryRepository },
    { provide: ProgressRepository, useClass: ProgressInMemoryRepository },
    { provide: ChallengeRepository, useClass: ChallengeInMemoryRepository },
  ],
})
export class AppModule {}
