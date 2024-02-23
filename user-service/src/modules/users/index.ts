import { Container } from 'brandi';
import { USER_MANAGEMENT_OPERATOR_TOKEN, UserManagementOperatorImpl } from './user-management-operator';

export function bindToContainer(container: Container) {
    container.bind(USER_MANAGEMENT_OPERATOR_TOKEN).toInstance(UserManagementOperatorImpl).inSingletonScope();
}
