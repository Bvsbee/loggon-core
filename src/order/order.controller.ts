//Controller meant for inventory(possibly orders?) 
import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
@Controller('orders')
export class OrdersController {
  @Get()
  getItems(@Query('category') category: string, @Query('status') status: string) {
    return `Get products with category: ${category} and status: ${status}`;
  }
  @Post()
  createItem(@Body() newProduct: any) {
    return `Product created: ${JSON.stringify(newProduct)}`;
  }
  @Patch(':id')
  editProduct(@Param('id') id: string, @Body() updatedProduct: any) {
    return `Product with ID ${id} updated: ${JSON.stringify(updatedProduct)}`;
  }
  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return `Product with ID ${id} deleted`;
  }
}