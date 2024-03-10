import { Module } from '@nestjs/common'
import { RegisterUserCommandHandler } from './core/application/user/register-user.command-handler'
import { CreateUserController } from './core/ui/api/create-user.controller'
import { UserRepository } from './core/domain/user/user.repository'
import { UserInMemoryRepository } from './core/infrastructure/in-memory/user.in-memory.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from './core/infrastructure/database/models/users.models'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [CreateUserController],
  providers: [
    RegisterUserCommandHandler,
    { provide: UserRepository, useClass: UserInMemoryRepository },
  ],
})
export class AppModule {}
