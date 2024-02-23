import { Container } from 'brandi';
import { KAFKA_ADMIN_TOKEN, getKafkaAdmin } from './admin';

export async function bindToContainer(container: Container) {
    container.bind(KAFKA_ADMIN_TOKEN).toInstance(getKafkaAdmin).inSingletonScope();
    const kafkaAdmin = container.get(KAFKA_ADMIN_TOKEN);
    await kafkaAdmin.connect();
}
