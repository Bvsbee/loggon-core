// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Category } from 'src/category/entities/category.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class CategorySeeder implements OnModuleInit {
//   constructor(
//     @InjectRepository(Category)
//     private readonly categoryRepository: Repository<Category>,
//   ) {}
// // 
//   async onModuleInit() {
//     const categories = [
//       { name: 'Hardwood', children: ['Oak', 'Maple', 'Birch'] },
//       { name: 'Softwood', children: ['Cedar', 'Douglas Fir', 'Pine'] },
//     ];

//     for (const cat of categories) {
//       let parent = await this.categoryRepository.findOne({
//         where: { name: cat.name },
//       });
//       if (!parent) {
//         parent = this.categoryRepository.create({ name: cat.name });
//         await this.categoryRepository.save(parent);
//       }

//       for (const sub of cat.children) {
//         let subCategory = await this.categoryRepository.findOne({
//           where: { name: sub },
//         });
//         if (!subCategory) {
//           subCategory = this.categoryRepository.create({ name: sub, parent });
//           await this.categoryRepository.save(subCategory);
//         }
//       }
//     }
//   }
// }
