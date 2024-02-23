import { injected, token } from 'brandi';
import { Consumer, Kafka } from 'kafkajs';
import { KAFKA_CONFIG_TOKEN, KafkaConfig } from '../../../config/kafka';
import { KAFKA_INSTANCE_TOKEN } from '../client';

export function getKafkaConsumer(kafka: Kafka, config: KafkaConfig): Consumer {
    return kafka.consumer({
        groupId: config.groupId,
    });
}

injected(getKafkaConsumer, KAFKA_INSTANCE_TOKEN, KAFKA_CONFIG_TOKEN);

export const KAFKA_CONSUMER_TOKEN = token<Consumer>('KafkaConsumer');
