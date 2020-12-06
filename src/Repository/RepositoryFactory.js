import UserRepository from './UserRepository';

const repositories = {
    user_repository: UserRepository,
}

export const RepositoryFactory = {
    get: name => repositories[name],
};