import { Producer } from 'kafkajs';
import { IEvent } from '../../interfaces';

export abstract class EventProducer<T = any> {
    constructor(private producer: Producer) {}

    abstract topic: IEvent<T>['topic'];

    public send(payload: IEvent<T>['data']) {
        return this.producer.send({
            topic: this.topic,
            messages: [{ value: JSON.stringify(payload) }],
        });
    }

    public sendBatch(payloads: IEvent<T>['data'][]) {
        return this.producer.send({
            topic: this.topic,
            messages: payloads.map((p) => ({ value: JSON.stringify(p) })),
        });
    }
}
