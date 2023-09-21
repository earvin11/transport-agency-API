import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight } from './entities/flight.entity';
import { BuySeatsDto } from './dto/buy-seats.dto';


@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight.name)
    private flightModel: Model<Flight>,
  ) {}

  async create(createFlightDto: CreateFlightDto) {
    const uuid = uuidv4();
    const createdFlight = new this.flightModel({uuid , ...createFlightDto});
    await createdFlight.save();
    return createdFlight;
  }

  async findAll() {
    const flights = await this.flightModel.find({ isActive: true });
    return flights;
  }

  async findOne(uuid: string) {
    const flight = await this.flightModel.findOne({ uuid });
    return flight;
  }

  async buySets( buySeatsDto: BuySeatsDto ) {
    const flight = await this.findOne(buySeatsDto.uuid);
    const quantitySeats = flight.seatsAvailable - buySeatsDto.quantity;

    if(quantitySeats < 0) return new BadRequestException('Cantidad no disponible');
    flight.seatsAvailable = quantitySeats;

    await flight.updateOne( flight, {new: true});
    return { ...flight.toJSON() }
  }

  update(id: number, updateFlightDto: UpdateFlightDto) {
    return `This action updates a #${id} flight`;
  }

  async remove(uuid: string) {
    const { deletedCount } = await this.flightModel.deleteOne({ uuid });

    if(deletedCount === 0) {
      throw new BadRequestException(`Flight with uuid "${ uuid }" not found`);
    }
    return;
  }
}
