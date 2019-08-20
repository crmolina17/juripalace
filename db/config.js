module.exports = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: process.env.DB_POOL_MAX,
    min: process.env.DB_POOL_MIN,
    idle: process.env.DB_POOL_IDLE
  },
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created',
    updatedAt: 'updated',
    deletedAt: 'deleted',
    version: 'locking'
  },
  logging: process.env.DB_LOGGING
    ? sql => {
      PER.log.info(sql);
    }
    : process.env.DB_LOGGING
};