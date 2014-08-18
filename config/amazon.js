var config = module.exports = {};

config.env = 'amazon';
config.hostname = 'adelabsdatabase.cgt5jqzhrupw.us-west-2.rds.amazonaws.com';
config.force = false;

//postgres database
config = {};
config.uri = process.env.POSTGRES_URI || 'adelabsdatabase.cgt5jqzhrupw.us-west-2.rds.amazonaws.com';
config.database = 'accessonly';
config.username = 'labsuser';
config.password = 'password';

module.exports = config;