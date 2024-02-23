import { Container } from 'brandi';
import * as admin from './admin';
import * as consumer from './consumer';
import * as producer from './producer';

import { KAFKA_INSTANCE_TOKEN, getKafkaInstance } from './client';

export async function bindToContainer(container: Container) {
    container.bind(KAFKA_INSTANCE_TOKEN).toInstance(getKafkaInstance).inSingletonScope();
    await Promise.all([
        admin.bindToContainer(container),
        consumer.bindToContainer(container),
        producer.bindToContainer(container),
    ]);
}
