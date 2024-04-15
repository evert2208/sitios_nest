import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRoot({
    ssl: process.env.STAGE === 'prod',
    extra: {
      ssl: process.env.STAGE === 'prod'
            ? { rejectUnauthorized: false }
            : null,
    },
    type: 'postgres',
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.BD_USERNAME,
    password: process.env.BD_CLAVE,
    database: process.env.BD_NAME,
    // entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }),
  AuthModule, CiudadesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
