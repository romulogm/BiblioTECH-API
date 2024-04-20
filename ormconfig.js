require('dotenv/config');

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'bibliotech',
  password: process.env.DB_PASSWORD || 'bibliotech',
  database: process.env.DB_NAME || 'bibliotech_db',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8',
  driver: 'mysql',
  synchronize: false,
  entities: process.env.NODE_ENV !== 'production' ? ['**/**.entity.ts'] : ['dist/**/*.entity.js'],
  logging: process.env.NODE_ENV !== 'production' ? 'all' : 'error',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations'
  },
  connectTimeout: 30000,
  acquireTimeout: 30000
};
