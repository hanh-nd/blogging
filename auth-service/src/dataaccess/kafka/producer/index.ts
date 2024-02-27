import { Container } from 'brandi';
import { KAFKA_PRODUCER_TOKEN, getKafkaProducer } from './producer';

export async function bindToContainer(container: Container) {
    container.bind(KAFKA_PRODUCER_TOKEN).toInstance(getKafkaProducer).inSingletonScope();
}
