import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuarios')
export class Usuario {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    user: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    nombre: string;

}
