import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,

    ){}
    
    //creates review
    async create(createReviewDto: CreateReviewDto, user: User): Promise<Review> {
        const existingReview = await this.reviewRepository.findOne({
            where: {
                productId: createReviewDto.productId,
                userId: user.id,
            },
        });

        if (existingReview){
            throw new BadRequestException('You have already reviewed this product')
        }
        
        const review = this.reviewRepository.create({
            ...createReviewDto,
            userId: user.id,
            user: user,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return this.reviewRepository.save(review);
        
    }

    //deletes a review by id
    async remove(id: string, userId: string): Promise<void>{
        const review = await this.reviewRepository.findOne({
            where: {id},
        });

        if(!review){
            throw new BadRequestException('Review not found');
        }

        //check if user owns this review
        if(review.userId !== userId) {
            throw new BadRequestException('You can only delete your own reviews');
        }

        //deletes
        await this.reviewRepository.remove(review);
    }
    
    
    
    //retrieves reviews from db
    async findAll(): Promise<Review[]> {
        return this.reviewRepository.find({
            relations: ['user', 'product'],
        });
    }

    //retrieves reviews for a specific product
    async findByProduct(productId: string): Promise<Review[]>{
        return this.reviewRepository.find({
            where: {productId},
            relations: ['user'],
        });
    }

    //avg rating calculator
    async calculateProductAverageRating(productId: string): Promise<number> {
        const reviews = await this.reviewRepository.find({
            where: {productId},
        });

        //if no reviews
        if(reviews.length === 0 ){
            return 0;
        }

        //calculate and return avg
        let sum = 0;
        for (const review of reviews) {
        sum += review.rating;
}
        return sum / reviews.length;
    }
}