import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import type { Express } from 'express';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';

import swaggerDocument from '../public/swagger.json';

import { appDataSource } from './database/dataSource';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import router from './router';

config();
const PORT = parseInt(process?.env?.PORT) || 3000;

const init = async (): Promise<void> => {
  try {
    await appDataSource.initialize();

    const app: Express = express();
    app.use(cors());
    app.use(cookieParser());

    app.use('/api', router);
    app.use('/docs', serve, setup(swaggerDocument));
    app.use(errorHandlerMiddleware);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`
         _____                                   
        / ____|                            /\\    
       | |  __ _ __ _   _ _ __   ___      /  \\   
       | | |_ | '__| | | | '_ \\ / _ \\    / /\\ \\  
       | |__| | |  | |_| | |_) | (_) |  / ____ \\ 
        \\_____|_|   \\__,_| .__/ \\___/  /_/    \\_\\
                         | |                     
                         |_|\n
     O servidor está rodando na porta: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
