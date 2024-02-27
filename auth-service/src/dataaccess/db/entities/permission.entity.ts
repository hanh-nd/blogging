import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity({
    name: 'permissions',
})
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'permission_id',
    })
    permissionId: number;

    @Column({
        nullable: false,
        name: 'resource',
    })
    resource: string;

    @Column({
        nullable: false,
        name: 'action',
    })
    action: string;
}
