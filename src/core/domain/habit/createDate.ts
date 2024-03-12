export class HabitCreateDate {
  constructor(readonly value: Date) {}

  static create(value: Date): HabitCreateDate {
    return new HabitCreateDate(value)
  }
}
