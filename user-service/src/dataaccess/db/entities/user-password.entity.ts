import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user.entity';

@Entity({
    name: 'user_passwords',
})
export class UserPassword extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'user_password_id',
    })
    userPasswordId: number;

    @Column({
        nullable: false,
        name: 'password',
    })
    password: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
