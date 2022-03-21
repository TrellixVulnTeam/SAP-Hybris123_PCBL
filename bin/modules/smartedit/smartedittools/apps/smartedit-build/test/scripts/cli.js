/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path = require('path');
const Server = require('karma').Server;

const createTemplates = require('./create-templates');

(async () => {
  await createTemplates();

  const karmaConfig = require(path.join(process.cwd(), 'karma.conf.js'));

  const server = new Server(karmaConfig, function(exitCode) {
    console.log('Karma has exited with ' + exitCode)
    process.exit(exitCode)
  });

  server.start();
})();
