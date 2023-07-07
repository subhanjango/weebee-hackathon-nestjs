import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('')
  async bookASlot(@Body() body : CreateBookingDto) {
    return await this.bookingsService.createBooking(body);
  }
}
