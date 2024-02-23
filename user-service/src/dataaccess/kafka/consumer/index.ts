import { Container } from 'brandi';
import { KAFKA_CONSUMER_TOKEN, getKafkaConsumer } from './consumer';
import { EventConsumerManager, KAFKA_EVENT_CONSUMER_MANAGER_TOKEN } from './events/event-consumer-manager';

export async function bindToContainer(container: Container) {
    container.bind(KAFKA_CONSUMER_TOKEN).toInstance(getKafkaConsumer).inSingletonScope();
    container.bind(KAFKA_EVENT_CONSUMER_MANAGER_TOKEN).toInstance(EventConsumerManager).inSingletonScope();
    const manager = container.get(KAFKA_EVENT_CONSUMER_MANAGER_TOKEN);
}
