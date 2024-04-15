import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCiudadeDto } from './dto/create-ciudade.dto';
import { UpdateCiudadeDto } from './dto/update-ciudade.dto';
import { Ciudade } from './entities/sitios.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CiudadesService {
  private readonly logger = new Logger('CiudadesService');
  constructor(
    @InjectRepository(Ciudade)
    private readonly ciudadRepository: Repository<Ciudade>,
  ){}
  
  
  async create(createCiudadeDto: CreateCiudadeDto) {
    try {
      const {...sitioData}= createCiudadeDto;
      const data = this.ciudadRepository.create({
        ...sitioData
      });
      await this.ciudadRepository.save( data )
      return {
        msg: "guardado exitoso!",
        data: data
      };
      
    } catch (error) {
      this.bdErrors(error);
    }
  }

  findAll(): Promise<Ciudade[]> {
    return this.ciudadRepository.find();
  }

 async findOne(id: number): Promise<Ciudade> {
    try {
      const data = await this.ciudadRepository.findOneBy({id: id})

        if(!data) throw new NotFoundException('Registro no encontrado')

          return {
            ...data
          }
    } catch (error) {
      this.bdErrors(error);
    }
  }

  async update(id: number, updateCiudadeDto: UpdateCiudadeDto) {

    const {...sitiodata}= updateCiudadeDto;
    const data = await this.ciudadRepository.findOneBy({id: id});

    if(!data) throw new NotFoundException('Registro no encontrado');
    try {
      
      await this.ciudadRepository.update(id,sitiodata);

      return {
        msg: "actualizado Exitosamente!",
        data: sitiodata
      }
    } catch (error) {
      this.bdErrors(error);
    }
  }

  async remove(id: number) {
    const data = await this.ciudadRepository.findOne({where: {id}});
      if(!data) throw new  NotFoundException('Registro no encontrado');
    try {
        await this.ciudadRepository.delete(id);
      return {
        msg: "Registro eliminado!"
      }
    } catch (error) {
     this.bdErrors(error); 
    }
  }

  private bdErrors( error: any ) {
    // console.log(error)
    this.logger.error(error)
    if(error.code ==='23505') throw new BadRequestException('el sitio ya exsiste');
    throw new InternalServerErrorException('Error en BD');
  }
}
