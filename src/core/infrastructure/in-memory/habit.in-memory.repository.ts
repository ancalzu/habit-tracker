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
    const habitModel = new HabitModel(
      habit.id,
      habit.name.valueName,
      habit.frequency,
      habit.duration,
      habit.restTime,
      habit.userId,
      habit.createDate,
      habit.updateDate,
      habit.wearableDeviceId,
      habit.status,
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

  findUniqueHabitByUser(name: Name, userId: string): Habit | undefined {
    return this.habits.find(
      (habit) => habit.userId === userId && habit.name === name,
    )
  }

  async listAllbyUser(userId: string): Promise<Habit[]> {
    const userHabits = await this.postRepository.findBy({ userId: userId })
    const habitList: Habit[] = []

    userHabits.forEach((habit) => {
      habitList.push(
        new Habit(
          habit.id,
          new Name(habit.name),
          habit.frequency,
          habit.duration,
          habit.restTime,
          habit.userId,
          habit.createDate,
          habit.updateDate,
          habit.wearableDeviceId,
          habit.status,
        ),
      )
    })

    return habitList
  }

  async findById(id: string): Promise<Habit | undefined | Habit> {
    const habits = this.postRepository.findBy({ id: id })
    const habitFinded = await habits
      .then((habits) => {
        const habitList = new Habit(
          habits[0].id,
          new Name(habits[0].name),
          habits[0].frequency,
          habits[0].duration,
          habits[0].restTime,
          habits[0].userId,
          habits[0].createDate,
          habits[0].updateDate,
          habits[0].wearableDeviceId,
          habits[0].status,
        )
        return habitList
      })
      .catch((error) => {
        console.error('Ocurrió un error al obtener los hábitos:', error)
      })

    let habit2: Habit
    if (habitFinded) {
      habit2 = new Habit(
        habitFinded.id,
        habitFinded.name,
        habitFinded.frequency,
        habitFinded.duration,
        habitFinded.restTime,
        habitFinded.userId,
        habitFinded.createDate,
        habitFinded.updateDate,
        habitFinded.wearableDeviceId,
        habitFinded.status,
      )
    }
    return habit2
  }

  isHabitSaved(habit: Habit): boolean {
    return this.habits.some((h) => h.id === habit.id)
  }

  updateStatus(habit: Habit): void {
    const habitModel = new HabitModel(
      habit.id,
      habit.name.valueName,
      habit.frequency,
      habit.duration,
      habit.restTime,
      habit.userId,
      habit.createDate,
      habit.updateDate,
      habit.wearableDeviceId,
      habit.status,
    )
    //this.postRepository.updateStatus(habitModel)
    this.postRepository.save(habitModel)
  }
}
