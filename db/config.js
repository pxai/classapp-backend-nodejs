function isTestEnv() {
  return process.env.NODE_ENV === 'test';
}

function getTestDatabaseName() {
  return process.env.MYSQL_DATABASE_TEST || 'classapp_test';
}

function getDbConfig() {
  const database = isTestEnv()
    ? getTestDatabaseName()
    : process.env.MYSQL_DATABASE;

  if (isTestEnv()) {
    return {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_ROOT_USER || 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || 'root',
      database,
    };
  }

  return {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database,
  };
}

function getAdminConfig() {
  return {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_ROOT_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'root',
  };
}

module.exports = {
  isTestEnv,
  getTestDatabaseName,
  getDbConfig,
  getAdminConfig,
};
