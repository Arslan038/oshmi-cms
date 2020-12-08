import UserRepository from './UserRepository';
import CourseRepository from './CourseRepository';
import CategoryRepository from './CategoryRepository';
import TutorRepository from './TutorRepository';

const repositories = {
    user_repository: UserRepository,
    course_repository: CourseRepository,
    category_repository: CategoryRepository,
    tutor_repository: TutorRepository,
}

export const RepositoryFactory = {
    get: name => repositories[name],
};
