var config = module.exports = {};

config.env = 'development';
config.hostname = 'localhost';

//postgres database
config = {};
config.uri = process.env.POSTGRES_URI || 'localhost';
config.database = 'access-only';
config.username = 'postgres';
config.password = 'password';

module.exports = config;