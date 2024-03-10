import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Permission } from './permission.entity';

@Entity({
    name: 'roles',
})
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'role_id',
    })
    roleId: number;

    @Column({
        nullable: false,
        unique: true,
        name: 'name',
    })
    @Index()
    name: string;

    @ManyToMany(() => Permission, undefined, {
        cascade: true,
    })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'roleId',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'permissionId',
        },
    })
    permissions: Permission[];
}
