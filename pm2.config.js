module.exports = {
  apps: [
    {
      name: 'blog',
      exec_mode: 'cluster',
      script: './server/index.js',
      log_date_format: 'YYYY-MM-DD HH:mm',
      error_file: '/home/logs/nuxt/error.log',
      out_file: '/home/logs/nuxt/out.log',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
