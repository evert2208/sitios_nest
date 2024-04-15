import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from './decorators/get-user.decorator';
import { Usuario } from './entities/user.entity';
import { Public } from './decorators/ruta-publica.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('check-status')
  checkAuthStatus(
    @GetUser() user: Usuario
  ) {
    return this.authService.checkAuthStatus( user );
  }

  @Public()
  @Post('registro')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Public()
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  
}
