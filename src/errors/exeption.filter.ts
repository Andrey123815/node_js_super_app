import { NextFunction, Request, Response } from 'express';
// import { ILogger } from '../logger/logger.interface';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import 'reflect-metadata';

export class ExeptionFilter implements IExeptionFilter {
	// constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			// this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			// this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
