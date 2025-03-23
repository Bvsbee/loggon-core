import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Delete,
    Param,
    Get
  } from '@nestjs/common';
  import { Review } from './review.entity';
  import { ReviewService } from './review.service';
  import { CreateReviewDto } from './dto/create-review.dto';
  import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
  
  @Controller('reviews')
  export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}
  
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createReview(
      @Body() createReviewDto: CreateReviewDto,
      @Request() req
    ): Promise<Review> {
      return this.reviewService.create(createReviewDto, req.user);
    }

    @Get()
    async findAll(): Promise<Review[]> {
      return this.reviewService.findAll();
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteReview(
      @Param('id') id: string,
      @Request() req
    ): Promise<void> {
      return this.reviewService.remove(id, req.user.id);
    }
}
