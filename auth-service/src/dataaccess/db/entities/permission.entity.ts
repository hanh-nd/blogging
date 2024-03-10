import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
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
    @Index()
    resource: string;

    @Column({
        nullable: false,
        name: 'action',
    })
    @Index()
    action: string;
}
