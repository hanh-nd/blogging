import { injected, token } from 'brandi';
import { Admin, Kafka } from 'kafkajs';
import { KAFKA_INSTANCE_TOKEN } from '../client';

export function getKafkaAdmin(kafka: Kafka): Admin {
    return kafka.admin();
}

injected(getKafkaAdmin, KAFKA_INSTANCE_TOKEN);

export const KAFKA_ADMIN_TOKEN = token<Admin>('KafkaAdmin');
