import { Container } from 'brandi';
import {
    USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN,
    UserPasswordManagementOperatorImpl,
} from './user-password-management-operator';

export function bindToContainer(container: Container) {
    container
        .bind(USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN)
        .toInstance(UserPasswordManagementOperatorImpl)
        .inSingletonScope();
}
