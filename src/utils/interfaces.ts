export interface IConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  db_url: string;
  dialect: string;
  port: number;
  secretKey: string;
  options: {
    expiresIn: string | number;
  };
  api: any;
}
