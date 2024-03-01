import { Container } from 'brandi';
import dotenv from 'dotenv';
import * as config from '../config';
import * as cache from '../dataaccess/cache';
import * as db from '../dataaccess/db';
import * as kafka from '../dataaccess/kafka';
import { KAFKA_EVENT_CONSUMER_MANAGER_TOKEN } from '../dataaccess/kafka/consumer/events/event-consumer-manager';
import * as jobs from '../jobs';
import * as modules from '../modules';
import * as utils from '../utils';

export async function startKafkaConsumer(envPath?: string): Promise<void> {
    dotenv.config({ path: envPath });

    const container = new Container();

    // binding services
    config.bindToContainer(container);
    cache.bindToContainer(container);
    await db.bindToContainer(container);
    await kafka.bindToContainer(container);
    jobs.bindToContainer(container);
    await modules.bindToContainer(container);
    utils.bindToContainer(container);

    // do initializations
    const manager = container.get(KAFKA_EVENT_CONSUMER_MANAGER_TOKEN);
    await manager.consume();
}
