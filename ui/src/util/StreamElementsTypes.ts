export interface StreamElementsMessageEvent {
  time: number;
  tags: {
    badges: string
    color: string
    "display-name": string
    emotes: string
    flags: string
    id: string
    mod: string
    "room-id": string
    subscriber: string
    "tmi-sent-ts": string
    turbo: string
    "user-id": string
    "user-type": string
  };
  nick: string
  userId: string
  displayName: string
  displayColor: string
  badges: [
    {
      type: string
      version: string
      url: string
      description: string
    }
  ];
  channel: string
  text: string
  isAction: boolean;
  emotes: [
    {
      type: string
      name: string
      id: string
      gif: boolean;
      urls: Record<string, string>
      start: number
      end: number
    }
  ];
  msgId: string
}
