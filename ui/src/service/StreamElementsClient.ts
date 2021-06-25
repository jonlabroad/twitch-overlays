// @ts-ignore
import io from 'socket.io-client';

export default class StreamElementsClient {
    socket: any;
    token: string;
    connected: boolean = false;
    handleEvent: (event: any) => void

    constructor(token: string, handleEvent: (event: any) => void) {
        this.token = token;
        this.handleEvent = handleEvent;
    }

    connect() {
        if (!this.connected) {
            this.socket = io('https://realtime.streamelements.com', {
                transports: ['websocket']
            });
            this.socket.on('connect', this.onConnect.bind(this));
            this.socket.on('disconnect', this.onDisconnect.bind(this));
            this.socket.on('authenticated', this.onAuthenticated.bind(this));
            this.socket.on('event', this.onEvent.bind(this));
            this.socket.on('event:update', this.onEventUpdate.bind(this));
            this.socket.on('event:reset', this.onEventReset.bind(this));
            this.socket.on('event:test', this.onEventTest.bind(this));
        }
    }

    onConnect() {
        console.log("SE Connected");
        this.socket.emit('authenticate', {
            method: 'jwt',
            token: this.token,
        });
    }

    onDisconnect() {
        console.log("SE Disconnected");
        this.connected = false;
    }

    onAuthenticated(data: any) {
        console.log("SE authenticated");
        this.connected = true;
        console.log(`SE successfullly connected to channel ${data.channelId}`);
    }

    onEvent(data: any) {
        console.log("Event");
        //console.log({data});
    }

    onEventUpdate(data: any) {
        console.log("Event update");
        this.handleEvent(data);
        //console.log({data});
    }

    onEventTest(data: any) {
        console.log("Event test");
        this.handleEvent(data);
        //console.log({data});
    }

    onEventReset(data: any) {
        console.log("Event reset");
        //console.log({data});
    }
}