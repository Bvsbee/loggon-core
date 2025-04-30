import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @Get('summary')
  @HttpCode(HttpStatus.OK)
  async getDashboardSummary(@Param('userId') userId: string) {
    return this.adminService.getDashboardSummary();
  }
}
