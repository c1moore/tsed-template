import { $log, ServerLoader } from '@tsed/common';

import Server from './Server';

(async (): Promise<void> => {
  $log.debug('Starting server...');

  const server = await ServerLoader.bootstrap(Server);
  await server.listen();

  $log.debug('Server listening');
})();
