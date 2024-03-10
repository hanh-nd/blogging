import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthProvider } from '../../../constants';
import { BaseEntity } from './base-entity';
import { Role } from './role.entity';

@Entity({
    name: 'users',
})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'user_id',
    })
    userId: number;

    @Column({
        nullable: false,
        name: 'user_name',
    })
    @Index()
    userName: string;

    @Column({
        nullable: true,
        name: 'display_name',
    })
    displayName?: string;

    @Column({
        unique: true,
        nullable: false,
        name: 'email',
    })
    @Index()
    email: string;

    @Column({
        nullable: false,
        name: 'provider',
    })
    provider: AuthProvider;

    @ManyToMany(() => Role, undefined, {
        cascade: true,
    })
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'userId',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'roleId',
        },
    })
    roles: Role[];
}
