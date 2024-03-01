import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'public_keys',
})
export class PublicKey {
    @PrimaryGeneratedColumn({
        name: 'key_id',
    })
    keyId: number;

    @Column('text')
    data: string;
}
