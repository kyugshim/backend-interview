import dotenv from 'dotenv';
dotenv.config();

//  Extend Express Request object using Typescript
declare global {
    namespace Express {
        export interface Request {
            user: import('./interface/User').User;
        }
    }
}

import { App } from './app';

async function main(){
    const app = new App(3000);
    await app.listen();
} 

main();