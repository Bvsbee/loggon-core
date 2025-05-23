import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { UsersModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
// import { CategorySeeder } from './seeds/category-seeder';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './Reviews/review.module';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'), // Folder where your images are stored
      serveRoot: '/uploads', // URL path prefix to access the files
    }),
    UsersModule,
    CategoryModule,
    JwtModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
    OrderModule,
    ReviewModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
