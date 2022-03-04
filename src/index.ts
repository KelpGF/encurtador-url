import { MongoConnection } from './database/mongo.connection';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import shortenRoutes from './routes/shorten.route';

const api = express();

// Configuração de banco de dados
const database = new MongoConnection();
database.connect();

// Configuração da aplicação
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Configuração de Rotas
api.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'Hello' });
});
api.use(shortenRoutes);

api.listen(5000, () => console.log('express init'));
