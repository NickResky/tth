var sh = require('shelljs');
sh.echo("Setup production build");


sh.rm('-rf', "node_modules/webapps-reschke-common-dist");

sh.cp("-R", "node_modules/webapps-reschke-common/dist", "node_modules/webapps-reschke-common-dist");


