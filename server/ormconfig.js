module.exports = [
  {
    name: 'development',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    useUnifiedTopology: true,
    database: 'multiple-choice',
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  {
    name: 'production',
    type: 'mongodb',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'multiple-choice',
    url: process.env.DATABASE_URL,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ['dist/entities/**/*.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    cli: {
      entitiesDir: 'dist/entities',
      migrationsDir: 'dist/migration',
      subscribersDir: 'dist/subscriber',
    },
  },
]
