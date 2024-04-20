export interface WearableService {
  execute(wearableDeviceId: string): boolean
}

export const wearableService = Symbol('WearableService')
