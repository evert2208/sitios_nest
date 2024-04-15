import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Ciudades')
export class Ciudade {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    nombre: string;

    @Column('text')
    direccion: string;

    @Column('text')
    barrio: string;


}
