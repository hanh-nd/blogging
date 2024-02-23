import { KafkaMessage } from 'kafkajs';
import { IEvent } from '../../interfaces';

export abstract class EventConsumer<T = any> {
    abstract topic: IEvent<T>['topic'];

    abstract onMessage(data: IEvent<T>['data'], message?: KafkaMessage): Promise<void> | void;
}
