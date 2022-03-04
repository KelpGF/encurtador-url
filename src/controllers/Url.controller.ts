import { config } from '../config/Constants';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import shortId from 'shortid';
import { URLModel } from '../database/models/URL.model';

export class UrlController {
    public async shorten(req: Request<{ originURL: string }>, res: Response): Promise<void> {
        const { originURL } = req.body;

        const url = await URLModel.findOne({ originURL });

        if (url) {
            res.status(StatusCodes.CONFLICT).json({ message: 'URL já cadastrada' });
            return;
        }

        const hash = shortId.generate();

        const shortURL = config.API_URL + hash;

        const newURL = await URLModel.create({ originURL, hash, shortURL });

        res.status(StatusCodes.OK).json(newURL);
    }

    public async redirect(req: Request, res: Response) {
        const { hash } = req.params;

        const url = await URLModel.findOne({ hash });

        if (url) {
            res.redirect(url.originURL);
            return;
        }

        res.status(StatusCodes.NOT_FOUND).json({ message: 'URL não encontrada' });
    }
}
