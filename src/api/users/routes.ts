import * as Hapi from 'hapi';

import validate from './validate';
import IRoute from '../../helper/route';
import Logger from '../../helper/logger';
import UserController from './controller';

class UserRoutes implements IRoute {
    public controller = new UserController();

    public async register(server: Hapi.Server): Promise<any> {
        return new Promise(resolve => {
            Logger.info('UserRoutes - Start adding user routes.');

            server.route([
                {
                    method: 'POST',
                    path: '/api/users',
                    config: {
                        handler: this.controller.create,
                        validate: validate.create,
                        description: 'Method that creates a new user.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    method: 'PUT',
                    path: '/api/users/{id}',
                    config: {
                        handler: this.controller.updateById,
                        validate: validate.updateById,
                        description: 'Method that updates a user by its id.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: '/api/users/{id}',
                    config: {
                        handler: this.controller.getById,
                        validate: validate.getById,
                        description: 'Method that get a user by its id.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: '/api/users',
                    config: {
                        handler: this.controller.getAll,
                        description: 'Method that gets all users.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    method: 'DELETE',
                    path: '/api/users/{id}',
                    config: {
                        handler: this.controller.deleteById,
                        validate: validate.deleteById,
                        description: 'Method that deletes a user by its id.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
            ]);

            Logger.info('UserRoutes - Finish adding user routes.');

            resolve();
        });
    }
}

export default new UserRoutes();
