// event-bus.d.ts
export interface IEventBus {
    subscribe(eventType: string, callback: Function): void;
    unsubscribe(eventType: string, callback: Function): void;
    publish(eventType: string, data: any): void;
}

export declare const sharedEventBus: IEventBus;
