import { Container } from 'brandi';
import * as permissions from './permissions';
import * as roles from './roles';
import * as tokens from './tokens';
import * as userPassword from './user-passwords';
import * as user from './users';

export async function bindToContainer(container: Container) {
    roles.bindToContainer(container);
    permissions.bindToContainer(container);
    await tokens.bindToContainer(container);
    user.bindToContainer(container);
    userPassword.bindToContainer(container);
}
