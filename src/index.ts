import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';

import Server from './Server';

(async (): Promise<void> => {
  $log.debug('Starting server...');

  const server = await PlatformExpress.bootstrap(Server);
  await server.listen();

  $log.debug('Server listening');
})();
