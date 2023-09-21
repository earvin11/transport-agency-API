import { 
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel( User.name )
    private userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const uuid = uuidv4();
      const { password, ...dataUser } = createUserDto;
      
      const newUser = new this.userModel({
        uuid,
        password: bcrypt.hashSync( password, 10 ),
        ...dataUser
      });
  
      await newUser.save();
      return newUser;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findOne(term: string) {
    let user: User;

    if(isUUID(term)) {
      user = await this.userModel.findOne({ uuid: term })
    }

    user = await this.userModel.findOne({ email: term });
    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findOneAndUpdate({ uuid }, updateUserDto, { new: true });
      if(!user) return new NotFoundException(`User ${ uuid } not found`);
      
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(uuid: string) {
    try {
      const { deletedCount } = await this.userModel.deleteOne({ uuid });
      if( deletedCount === 0 ) return new BadRequestException(`User with ${ uuid } not found`);

      return;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors( error: any ): never {
    if(error.code === '23505'){
      throw new BadRequestException( error.detail );
    }

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');

  }
}
