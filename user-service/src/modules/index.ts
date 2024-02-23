import { Container } from 'brandi';
import * as userPassword from './user-passwords';
import * as user from './users';

export function bindToContainer(container: Container) {
    user.bindToContainer(container);
    userPassword.bindToContainer(container);
}
