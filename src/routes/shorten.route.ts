import { UrlController } from '../controllers/Url.controller';
import { Request, Response, Router } from 'express';

const shortenRoutes = Router();
const urlController = new UrlController();

shortenRoutes.post('/shorten/create', urlController.shorten);

shortenRoutes.get('/:hash', urlController.redirect);

export default shortenRoutes;
