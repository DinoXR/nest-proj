import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { Preference } from './entities/preference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessages, ResponseStatus, SuccessMessages } from 'src/util/enums';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
  ) {}

  async findAll() {
    try {
      const preferences = await this.preferenceRepository.find();
      return {
        status: ResponseStatus.SUCCESS,
        message: SuccessMessages.PREFERENCES_FETCHED_SUCCESSFULLY,
        data: preferences,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        ErrorMessages.FAILED_TO_FETCH_PREFERENCES,
        error.message,
      );
    }
  }

  async findOne(id: any) {
    try {
      const preference = await this.preferenceRepository.findOne(id);

      if (!preference) {
        throw new NotFoundException(ErrorMessages.PREFERENCE_NOT_FOUND);
      }

      return {
        status: ResponseStatus.SUCCESS,
        message: SuccessMessages.PREFERENCES_FETCHED_SUCCESSFULLY,
        data: preference.name,
      };
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        ErrorMessages.FAILED_TO_FETCH_PREFERENCES,
        error.message,
      );
    }
  }
}
