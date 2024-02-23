import { Container } from 'brandi';
import { MY_SQL_DATA_SOURCE_TOKEN, initializeMySQLDataSource } from './client';
import { USER_DATA_MAPPER_TOKEN, UserDataMapperImpl } from './mappers/user.dm';

export async function bindToContainer(container: Container) {
    container.bind(MY_SQL_DATA_SOURCE_TOKEN).toInstance(initializeMySQLDataSource).inSingletonScope();
    const mySQLDataSource = container.get(MY_SQL_DATA_SOURCE_TOKEN);
    await mySQLDataSource.initialize();
    container.bind(USER_DATA_MAPPER_TOKEN).toInstance(UserDataMapperImpl).inSingletonScope();
}
