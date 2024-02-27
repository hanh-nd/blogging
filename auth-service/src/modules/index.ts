import { Container } from 'brandi';
import * as roles from './roles';
import * as userPassword from './user-passwords';
import * as user from './users';

export function bindToContainer(container: Container) {
    roles.bindToContainer(container);
    user.bindToContainer(container);
    userPassword.bindToContainer(container);
}
