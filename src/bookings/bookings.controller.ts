import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async bookASlot(@Body() body : CreateBookingDto) {
    try {
      return await this.bookingsService.createBooking(body);
    } catch(e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
