import { Container } from 'brandi';
import * as user from './users';

export function bindToContainer(container: Container) {
    user.bindToContainer(container);
}
