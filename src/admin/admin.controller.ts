import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('summary')
  @HttpCode(HttpStatus.OK)
  async getDashboardSummary() {
    return this.adminService.getDashboardSummary();
  }
}
