export class LogChallengeProgressCommand {
  constructor(
    readonly habitId: string,
    readonly userId: string,
    readonly progress: number,
  ) {}
}
