module.exports = {
  apps: [
    {
      name: 'phone_book_server',
      script: './index.js',
      watch: true,
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
