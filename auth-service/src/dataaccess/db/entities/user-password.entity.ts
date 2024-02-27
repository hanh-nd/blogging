import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user.entity';

@Entity({
    name: 'user_passwords',
})
export class UserPassword extends BaseEntity {
    @PrimaryColumn({
        nullable: false,
        name: 'password',
    })
    password: string;

    @PrimaryColumn({
        nullable: false,
        name: 'user_id',
    })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
