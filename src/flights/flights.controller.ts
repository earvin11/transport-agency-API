import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { BuySeatsDto } from './dto/buy-seats.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @UseGuards( AuthGuard('jwt') )
  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @UseGuards( AuthGuard('jwt') )
  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.flightsService.findOne(uuid);
  }

  @Post('buy-seats')
  buySeats(@Body() buySeatsDto: BuySeatsDto) {
    return this.flightsService.buySets(buySeatsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(+id, updateFlightDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.flightsService.remove(uuid);
  }
}
