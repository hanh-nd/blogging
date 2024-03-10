import { Container } from 'brandi';
import { PERMISSION_MANAGER_OPERATOR_TOKEN, PermissionManagerOperatorImpl } from './permission-manager-operator';

export function bindToContainer(container: Container) {
    container.bind(PERMISSION_MANAGER_OPERATOR_TOKEN).toInstance(PermissionManagerOperatorImpl).inSingletonScope();
}
