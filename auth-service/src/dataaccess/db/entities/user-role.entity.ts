import { Entity, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'user_roles',
})
export class UserRole {
    @PrimaryColumn({
        name: 'user_id',
    })
    userId: number;

    @PrimaryColumn({
        name: 'role_id',
    })
    roleId: number;
}
