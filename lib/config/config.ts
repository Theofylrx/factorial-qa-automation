export interface Config {
  baseURL: string;
}

export const config: Config = {
  baseURL: process.env.BASE_URL || 'http://qainterview.pythonanywhere.com',
};

export default config;
