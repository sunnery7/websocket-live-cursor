const concurrently = require('concurrently');

concurrently([
   {
      command: 'npm run dev',
      cwd: 'packages/client',
      name: 'client',
      prefixColor: 'green',
   },
   {
      command: 'npm run dev',
      cwd: 'packages/server',
      name: 'server',
      prefixColor: 'cyan',
   },
]);
