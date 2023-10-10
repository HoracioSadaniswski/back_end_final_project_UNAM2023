import { Sequelize } from 'sequelize';

const db = new Sequelize(
  'sqfvjvbt',
  'sqfvjvbt',
  'lb2StqHOyA3lPH6IDMltHWHXXUgTrJlJ',
  {
    host: 'silly.db.elephantsql.com',
    dialect: 'postgres',
    logging: true,

  }
);

export default db;
