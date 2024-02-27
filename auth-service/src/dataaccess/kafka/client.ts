import { injected, token } from 'brandi';
import { KafkaConfig as BaseKafkaConfig, Kafka } from 'kafkajs';
import { KAFKA_CONFIG_TOKEN, KafkaConfig } from '../../config/kafka';

export function getKafkaInstance(config: KafkaConfig): Kafka {
    return new Kafka(config as BaseKafkaConfig);
}

injected(getKafkaInstance, KAFKA_CONFIG_TOKEN);

export const KAFKA_INSTANCE_TOKEN = token<Kafka>('KafkaInstance');
