import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionType, ManagePreferencesType } from 'src/interfaces/types';
import { AuthService } from 'src/auth/auth.service';
import { APIGatewayProxyEventHeaders } from 'aws-lambda';
import { PreferencesService } from 'src/preferences/preferences.service';
import { ErrorMessages, ResponseStatus, SuccessMessages } from 'src/util/enums';
import { userCreateValidator } from 'src/validators/user-validators';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly preferencesService: PreferencesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { error } = userCreateValidator(createUserDto);
      if (error) {
        const errorMessage = error.details[0]?.message.replace(/["\\]/g, '');
        throw new UnauthorizedException(errorMessage);
      }
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return {
        status: ResponseStatus.SUCCESS,
        message: SuccessMessages.USER_CREATED_SUCCESSFULLY,
      };
    } catch (error) {
      throw new BadRequestException({
        status: ResponseStatus.FAILED,
        message: ErrorMessages.FAILED_TO_CREATE_USER,
        details: error.message,
      });
    }
  }

  async manageUserPreference(
    manageUserPreference: ManagePreferencesType,
  ): Promise<any> {
    try {
      const { headers, action, preference } = manageUserPreference;
      const id = await this.verifyAndGetId(headers);
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
      }

      switch (action) {
        case ActionType.GET:
          return await this.handleGetAction(user);

        case ActionType.CREATE:
          return await this.handleCreateAction(user, preference);

        case ActionType.DELETE:
          return await this.handleDeleteAction(user, preference);

        default:
          throw new BadRequestException({
            status: ResponseStatus.FAILED,
            message: ErrorMessages.INVALID_ACTION_TYPE,
          });
      }
    } catch (error) {
      throw new BadRequestException({
        status: ResponseStatus.FAILED,
        message: error.message,
      });
    }
  }

  async handleGetAction(user: User): Promise<any> {
    const preferencePromises: Promise<string>[] = user.preferences.map(
      async (pref: string) =>
        (await this.preferencesService.findOne(pref)).data,
    );
    const preferences = await Promise.all(preferencePromises);
    return {
      status: ResponseStatus.SUCCESS,
      data: preferences,
      message: SuccessMessages.PREFERENCES_FETCHED_SUCCESSFULLY,
    };
  }

  async handleCreateAction(user: User, preference: any): Promise<any> {
    const pref = await this.preferencesService.findOne(preference.preferenceId);

    if (!pref) {
      throw new NotFoundException(ErrorMessages.PREFERENCE_NOT_FOUND);
    }

    if (
      preference.preferenceId &&
      user.preferences.includes(preference.preferenceId)
    ) {
      throw new BadRequestException({
        status: ResponseStatus.FAILED,
        message: ErrorMessages.PREFERENCE_ALREADY_EXISTS,
      });
    }

    user.preferences.push(preference.preferenceId);
    await this.userRepository.save(user);

    return {
      status: ResponseStatus.SUCCESS,
      message: SuccessMessages.PREFERENCES_MANAGED_SUCCESSFULLY,
    };
  }

  async handleDeleteAction(user: User, preference: any): Promise<any> {
    if (!user.preferences || user.preferences.length === 0) {
      throw new BadRequestException({
        status: ResponseStatus.FAILED,
        message: ErrorMessages.USER_PREFERENCES_EMPTY,
      });
    }

    if (
      !preference.preferenceId ||
      !user.preferences.includes(preference.preferenceId)
    ) {
      throw new BadRequestException({
        status: ResponseStatus.FAILED,
        message: ErrorMessages.PREFERENCE_NOT_FOUND,
      });
    }

    user.preferences = user.preferences.filter(
      (pref: any) => pref !== preference.preferenceId,
    );
    await this.userRepository.save(user);

    return {
      status: ResponseStatus.SUCCESS,
      message: SuccessMessages.PREFERENCES_MANAGED_SUCCESSFULLY,
    };
  }

  private async verifyAndGetId(
    headers: APIGatewayProxyEventHeaders,
  ): Promise<string> {
    try {
      const verifyDetails = await this.authService.verifyUser(headers);
      return verifyDetails.sub;
    } catch (error) {
      throw new UnauthorizedException({
        status: ResponseStatus.FAILED,
        message: ErrorMessages.UNAUTHORIZED,
        data: error.message,
      });
    }
  }
}
