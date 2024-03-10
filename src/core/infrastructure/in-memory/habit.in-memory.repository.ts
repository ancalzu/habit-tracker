import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'
import { Name } from '../../domain/habit/name'
import { HabitModel } from '../database/models/habit.models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class HabitInMemoryRepository implements HabitRepository {
  constructor(
    @InjectRepository(HabitModel)
    private postRepository: Repository<HabitModel>,
  ) {}

  listAll(): Habit[] {
    throw new Error('Method not implemented.')
  }
  habits: Habit[] = []

  save(habit: Habit): void {
    this.habits.push(habit)
    const habitModel = new HabitModel(
      habit.id,
      habit.name.valueName,
      habit.frequency,
      habit.duration,
      habit.restTime,
      habit.userId,
      habit.createDate,
      habit.updateDate,
    )
    this.postRepository.save(habitModel)
  }

  findByName(name: Name): Habit | undefined {
    return this.habits.find((habit) => habit.name.equals(name))
  }

  addHabits(habits: Habit[]): HabitInMemoryRepository {
    this.habits.push(...habits)
    return this
  }

  findByUserById(name: Name, userId: string): Habit | undefined {
    return this.habits.find(
      (habit) => habit.userId === userId && habit.name === name,
    )
  }

  // isHabitSaved(habit: Habit): boolean {
  //   return this.habits.some((h) => h.id.equals(habit.id))
  // }
}
