import minimist from 'minimist';
import { initialize } from './cmd/initialize';
import { startGRPCServer } from './cmd/start-grpc-server';
import { startKafkaConsumer } from './cmd/start-kafka-consumer';

const args = minimist(process.argv);

if (args['initialize']) {
    initialize('.env').catch((error) => {
        console.log(error);
        process.exit(1);
    });
} else if (args['start_grpc_server']) {
    startGRPCServer('.env').catch((error) => {
        console.log(error);
        process.exit(1);
    });
} else if (args['start_kafka_consumer']) {
    startKafkaConsumer('.env').catch((error) => {
        console.log(error);
        process.exit(1);
    });
} else {
    console.log('no component was selected, exiting...');
}
