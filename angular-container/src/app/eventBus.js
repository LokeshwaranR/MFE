/// <reference path="eventbus.d.ts" />
class EventBus {
    constructor() {
      this.listeners = {};
    }

    subscribe(eventType, callback) {
      if (!this.listeners[eventType]) {
        this.listeners[eventType] = [];
      }
      this.listeners[eventType].push(callback);
    }

    unsubscribe(eventType, callback) {
      if (this.listeners[eventType]) {
        this.listeners[eventType] = this.listeners[eventType].filter(listener => listener !== callback);
      }
    }

    publish(eventType, data) {
      const subscribers = this.listeners[eventType];
      if (subscribers) {
        subscribers.forEach(callback => callback(data));
      }
    }
}

const sharedEventBus = new EventBus();
export default sharedEventBus;
