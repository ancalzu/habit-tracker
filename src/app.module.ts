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
import { ReminderModel } from './core/infrastructure/database/models/reminder.models'
import { AddReminderController } from './core/ui/api/add-reminder.controller'
import { AddReminderCommandHandler } from './core/application/reminder/add-reminder.command-handler'
import { ReminderInMemoryRepository } from './core/infrastructure/in-memory/reminder.in-memory.repository'
import { reminderRepository } from './core/domain/reminder/reminder.repository'
import { CreateGoalCommandHandler } from './core/application/goal/create-goal.command-handler'
import { GoalRepository } from './core/domain/goal/goal.repository'
import { CreateGoalController } from './core/ui/api/create-goal.controller'
import { GoalModel } from './core/infrastructure/database/models/goal.models'
import { GoalInMemoryRepository } from './core/infrastructure/in-memory/goal.in-memory.repository'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ChallengeEventsHandler } from './core/application/events/complete-challenge.event-handler'
import { UpdateEventsHandler } from './core/application/events/update-status.event-handler'
import { UpdateStatusController } from './core/ui/api/update-satus-habit.controller'
import { UpdateStatusCommandHandler } from './core/application/habit/update-status-habit.command-handler'
import { CancelChallengeController } from './core/ui/api/cancel-challenge.controller'
import { CancelChallengeCommandHandler } from './core/application/challenge/cancel-challenge.command-handler'
import { ListHabitController } from './core/ui/api/list-habit-by-user.controller'
import { ListHabitsCommandHandler } from './core/application/habit/list-habits.command-handler'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        UserModel,
        HabitModel,
        ProgressModel,
        ChallengeModel,
        ReminderModel,
        GoalModel,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserModel]),
    TypeOrmModule.forFeature([HabitModel]),
    TypeOrmModule.forFeature([ProgressModel]),
    TypeOrmModule.forFeature([ChallengeModel]),
    TypeOrmModule.forFeature([ReminderModel]),
    TypeOrmModule.forFeature([GoalModel]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [
    CreateUserController,
    CreateHabitController,
    CreateProgressController,
    CreateChallengeController,
    AddReminderController,
    CreateGoalController,
    UpdateStatusController,
    CancelChallengeController,
    ListHabitController,
  ],
  providers: [
    RegisterUserCommandHandler,
    CreateHabitCommandHandler,
    CreateProgressCommandHandler,
    CreateChallengeCommandHandler,
    AddReminderCommandHandler,
    CreateGoalCommandHandler,
    ChallengeEventsHandler,
    UpdateStatusCommandHandler,
    UpdateEventsHandler,
    CancelChallengeCommandHandler,
    ListHabitsCommandHandler,
    { provide: UserRepository, useClass: UserInMemoryRepository },
    { provide: HabitRepository, useClass: HabitInMemoryRepository },
    { provide: ProgressRepository, useClass: ProgressInMemoryRepository },
    { provide: ChallengeRepository, useClass: ChallengeInMemoryRepository },
    { provide: reminderRepository, useClass: ReminderInMemoryRepository },
    { provide: GoalRepository, useClass: GoalInMemoryRepository },
  ],
})
export class AppModule {}
