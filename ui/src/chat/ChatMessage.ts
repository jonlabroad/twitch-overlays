export interface ChatMessage {
    userId: string
    username: string
    displayName: string
    message: string
    isMod: boolean
    isVip: boolean
    timestamp: Date
}