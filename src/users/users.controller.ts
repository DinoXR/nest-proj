import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ActionType, PreferenceReqType } from 'src/interfaces/types';
import { APIGatewayProxyEventHeaders } from 'aws-lambda';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('preferences')
  async addPreference(
    @Body() preference: PreferenceReqType,
    @Headers() headers: APIGatewayProxyEventHeaders,
  ) {
    return this.usersService.manageUserPreference({
      headers,
      action: ActionType.CREATE,
      preference,
    });
  }

  @Get('preferences')
  async findUserPreferences(@Headers() headers: APIGatewayProxyEventHeaders) {
    return this.usersService.manageUserPreference({
      headers,
      action: ActionType.GET,
    });
  }

  @Delete('preferences')
  async deletePreferences(
    @Body() preference: PreferenceReqType,
    @Headers() headers: APIGatewayProxyEventHeaders,
  ) {
    return this.usersService.manageUserPreference({
      headers,
      action: ActionType.DELETE,
      preference,
    });
  }
}
