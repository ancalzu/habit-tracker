const validStatus = ['STARTED', 'ACHIEVED', 'FAILED']

export class ChallengeStatus {
  constructor(readonly value: string) {}

  static create(value: string): ChallengeStatus {
    if (!validStatus.includes(value)) {
      throw new Error(`Invalid challenge status: ${value}`)
    }

    return new ChallengeStatus(value)
  }

  static empty(): ChallengeStatus {
    return new ChallengeStatus('')
  }

  static started(): ChallengeStatus {
    return new ChallengeStatus('STARTED')
  }

  static archieved(): ChallengeStatus {
    return new ChallengeStatus('ARCHIEVED')
  }
}
