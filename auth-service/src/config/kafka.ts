import { token } from 'brandi';

export class KafkaConfig {
    constructor(
        public readonly brokers: string[],
        public readonly groupId: string,
        public readonly clientId?: string,
    ) {}

    public static fromEnv(): KafkaConfig {
        return {
            brokers: process.env.KAFKA_BROKERS?.split(',') || [],
            groupId: process.env.KAFKA_GROUP_ID || 'auth-service-group-id',
            clientId: process.env.KAFKA_CLIENT_ID,
        };
    }
}

export const KAFKA_CONFIG_TOKEN = token<KafkaConfig>('KafkaConfig');
