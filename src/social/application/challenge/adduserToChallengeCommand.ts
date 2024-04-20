export class AddUsersToChallengeCommand {
  constructor(
    readonly challengeId: string,
    readonly users: string[],
  ) {}
}
