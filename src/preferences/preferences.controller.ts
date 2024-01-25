import { Controller, Get } from '@nestjs/common';
import { PreferencesService } from './preferences.service';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}
  @Get()
  async findAll() {
    return this.preferencesService.findAll();
  }
}
