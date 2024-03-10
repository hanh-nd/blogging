import { Container } from 'brandi';
import {
    MY_SQL_DATA_SOURCE_TOKEN,
    MY_SQL_ENTITY_MANAGER_TOKEN,
    initializeMySQLDataSource,
    initializeMySQLEntityManger,
} from './client';
import { PERMISSION_DATA_MAPPER_TOKEN, PermissionDataMapperImpl } from './mappers/permission.dm';
import { PUBLIC_KEY_DATA_MAPPER_TOKEN, PublicKeyDataMapperImpl } from './mappers/public-key.dm';
import { ROLE_PERMISSION_DATA_MAPPER_TOKEN, RolePermissionDataMapperImpl } from './mappers/role-permission.dm';
import { ROLE_DATA_MAPPER_TOKEN, RoleDataMapperImpl } from './mappers/role.dm';
import { USER_PASSWORD_DATA_MAPPER_TOKEN, UserPasswordDataMapperImpl } from './mappers/user-password.dm';
import { USER_ROLE_DATA_MAPPER_TOKEN, UserRoleDataMapperImpl } from './mappers/user-role.dm';
import { USER_DATA_MAPPER_TOKEN, UserDataMapperImpl } from './mappers/user.dm';

export async function bindToContainer(container: Container) {
    container.bind(MY_SQL_DATA_SOURCE_TOKEN).toInstance(initializeMySQLDataSource).inSingletonScope();
    const mySQLDataSource = container.get(MY_SQL_DATA_SOURCE_TOKEN);
    await mySQLDataSource.initialize();
    container.bind(MY_SQL_ENTITY_MANAGER_TOKEN).toInstance(initializeMySQLEntityManger).inSingletonScope();
    container.bind(ROLE_DATA_MAPPER_TOKEN).toInstance(RoleDataMapperImpl).inSingletonScope();
    container.bind(PERMISSION_DATA_MAPPER_TOKEN).toInstance(PermissionDataMapperImpl).inSingletonScope();
    container.bind(ROLE_PERMISSION_DATA_MAPPER_TOKEN).toInstance(RolePermissionDataMapperImpl).inSingletonScope();
    container.bind(USER_DATA_MAPPER_TOKEN).toInstance(UserDataMapperImpl).inSingletonScope();
    container.bind(USER_PASSWORD_DATA_MAPPER_TOKEN).toInstance(UserPasswordDataMapperImpl).inSingletonScope();
    container.bind(USER_ROLE_DATA_MAPPER_TOKEN).toInstance(UserRoleDataMapperImpl).inSingletonScope();
    container.bind(PUBLIC_KEY_DATA_MAPPER_TOKEN).toInstance(PublicKeyDataMapperImpl).inSingletonScope();
}
