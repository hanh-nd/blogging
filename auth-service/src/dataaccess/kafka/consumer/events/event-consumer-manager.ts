import { injected, token } from 'brandi';
import { Consumer } from 'kafkajs';
import { toJSON } from '../../../../helpers';
import { KAFKA_CONSUMER_TOKEN } from '../consumer';
import { EventConsumer } from './event-consumer';

export type EventConsumerOptions = {
    fromBeginning?: boolean;
    logging?: boolean;
};

export class EventConsumerManager {
    private eventConsumers: EventConsumer[] = [];

    constructor(private consumer: Consumer) {}

    private get topics() {
        return this.eventConsumers.map((eventConsumer) => eventConsumer.topic);
    }

    private get eventConsumerMap() {
        return this.eventConsumers.reduce(
            (map: Map<string, EventConsumer>, eventConsumer: EventConsumer) =>
                map.set(eventConsumer.topic, eventConsumer),
            new Map(),
        );
    }

    add(eventConsumer: EventConsumer) {
        this.eventConsumers.push(eventConsumer);
    }

    async consume(options?: EventConsumerOptions) {
        await this.consumer.subscribe({
            topics: this.topics,
            fromBeginning: options?.fromBeginning ?? false,
        });

        await this.consumer.run({
            eachMessage: async ({ topic, message }) => {
                const eventConsumer = this.eventConsumerMap.get(topic);
                if (options?.logging) {
                    console.log(
                        '[EventConsumer][received]',
                        JSON.stringify({
                            topic,
                            message: toJSON(message.value?.toString()),
                            consumer: Object.getPrototypeOf(eventConsumer).constructor.name,
                        }),
                    );
                }
                if (!eventConsumer) return;

                try {
                    await eventConsumer.onMessage(toJSON(message.value?.toString()), message);
                } catch (error) {
                    if (error instanceof Error) {
                        console.log('[EventConsumer][error]', error.message);
                    }
                    throw error;
                }
            },
        });
    }
}

injected(EventConsumerManager, KAFKA_CONSUMER_TOKEN);

export const KAFKA_EVENT_CONSUMER_MANAGER_TOKEN = token<EventConsumerManager>('KAFKA_EVENT_CONSUMER_MANAGER_TOKEN');
