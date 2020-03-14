import { Service } from '@tsed/common';

import Health from '../models/Health';

@Service()
export default class HealthService {
  // eslint-disable-next-line class-methods-use-this
  async loadHealthStatus(): Promise<Health> {
    return {
      healthy: true,
    };
  }
}
