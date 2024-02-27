import { Container } from 'brandi';
import { ROLE_MANAGEMENT_OPERATOR_TOKEN, RoleManagementOperatorImpl } from './role-management-operator';

export function bindToContainer(container: Container) {
    container.bind(ROLE_MANAGEMENT_OPERATOR_TOKEN).toInstance(RoleManagementOperatorImpl).inSingletonScope();
}
