import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { Ciudade } from './entities/sitios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ciudade])
  ],
  controllers: [CiudadesController],
  providers: [CiudadesService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [CiudadesService,
    TypeOrmModule
  ]
})
export class CiudadesModule {}
