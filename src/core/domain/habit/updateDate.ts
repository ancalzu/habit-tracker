export class HabitupdateDate {
  constructor(readonly value: Date) {}

  static create(value: Date): HabitupdateDate {
    return new HabitupdateDate(value)
  }
}
