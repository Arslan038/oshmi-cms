import UserRepository from './UserRepository';
import CourseRepository from './CourseRepository';
import CategoryRepository from './CategoryRepository';
import TutorRepository from './TutorRepository';
import LessonRepository from './LessonRepository';
import MemberRepository from './MemberRepository';
import CorporateRepository from './CorporateRepository';
import BookingRepository from './BookingRepository';

const repositories = {
    user_repository: UserRepository,
    course_repository: CourseRepository,
    category_repository: CategoryRepository,
    tutor_repository: TutorRepository,
    lesson_repository: LessonRepository,
    member_repository: MemberRepository,
    corporate_repository: CorporateRepository,
    booking_repository: BookingRepository,
}

export const RepositoryFactory = {
    get: name => repositories[name],
};
