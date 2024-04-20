export class StartChallengeCommand {
  constructor(
    readonly id: string,
    readonly habitId: string,
    readonly target: number,
    readonly partner: string,
    readonly project: string,
    readonly cost: number,
    readonly deadline: Date,
    readonly users: string[],
  ) {}
}
