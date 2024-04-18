import { InvalidDateError } from './invalidDateError'

export class ProgressDate {
  constructor(readonly value: Date) {}

  static create(date: Date): ProgressDate {
    const now = new Date()
    if (date.getTime() > now.getTime()) {
      throw InvalidDateError.create()
    }

    return new ProgressDate(date)
  }
}
