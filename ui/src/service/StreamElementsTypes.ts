export interface StreamElementsEvent {
    listener: string
    event: FollowerEvent
}

export interface FollowerEvent {
    amount: number
    count: number
    isTest: boolean
    month: string
    name: string
    tier: string
    type: string
}

