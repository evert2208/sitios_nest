import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [ ConfigModule ],
    inject: [ ConfigService ],
    useFactory: ( configService: ConfigService ) => {
      return {
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn:'8h'
        }
      }
    }
  })
  
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [ TypeOrmModule, PassportModule, JwtModule, JwtStrategy ]
})
export class AuthModule {}
