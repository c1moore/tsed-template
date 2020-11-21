import { Controller, Get } from '@tsed/common';
import { Summary, Description, Returns } from '@tsed/schema';

import HealthService from '../services/HealthService';
import Health from '../models/Health';

@Controller('/health')
export default class HealthCtrl {
  private readonly healthService: HealthService;

  constructor(healthService: HealthService) {
    this.healthService = healthService;
  }

  @Get()
  @Summary('Returns the health of the system.')
  @Description('Returns the health of the system.')
  @Returns(200)
  async getHealth(): Promise<Health> {
    return this.healthService.loadHealthStatus();
  }
}
