import { Container } from 'brandi';
import {
    USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN,
    UserPasswordManagementOperatorImpl,
} from '../user-passwords/user-password-management-operator';
import { USER_MANAGEMENT_OPERATOR_TOKEN, UserManagementOperatorImpl } from './user-management-operator';

export function bindToContainer(container: Container) {
    container.bind(USER_MANAGEMENT_OPERATOR_TOKEN).toInstance(UserManagementOperatorImpl).inSingletonScope();
    container
        .bind(USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN)
        .toInstance(UserPasswordManagementOperatorImpl)
        .inSingletonScope();
}
