var sh = require('shelljs');
sh.echo("Setup production build");


sh.rm('-rf', "node_modules/webapps-reschke-common");

sh.cp("-R", "node_modules/webapps-reschke-common-dev/dist", "node_modules/webapps-reschke-common");


return process.exit(0);