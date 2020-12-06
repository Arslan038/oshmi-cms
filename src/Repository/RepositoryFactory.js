import UserRepository from './UserRepository';
import CourseRepository from './CourseRepository'

const repositories = {
    user_repository: UserRepository,
    course_repository: CourseRepository
}

export const RepositoryFactory = {
    get: name => repositories[name],
};
