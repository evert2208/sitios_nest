import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    
    try {
      
      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save( user )
      delete user.password;
      
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
      

    } catch (error) {
      this.bdErrors(error);
    }
  }


  async login(LoginUserDto: LoginUserDto) {
    const { password, user } = LoginUserDto;

    const usuario = await this.userRepository.findOne({
      where: { user },
      select: { user: true, password: true, id: true }
    });

    if ( !usuario ) 
      throw new UnauthorizedException('Credenciales no validas');
      
    if ( !bcrypt.compareSync( password, usuario.password ) )
      throw new UnauthorizedException('Credentials no validas');
    delete usuario.password;
    return {
      ...usuario,
      token: this.getJwtToken({ id: usuario.id })
    };
  }

  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;

  }
  async checkAuthStatus( user: Usuario ){

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }

  private bdErrors( error: any ): never {
    // console.log(error)
    if(error.code ==='23505') throw new BadRequestException('el usuario ya exsiste');
    throw new InternalServerErrorException('Error en BD');
  }
}
