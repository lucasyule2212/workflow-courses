import { GraphQLObjectType } from 'graphql';
import { CreateCourse } from './create-course';
import { CreateEnrollment } from './create-enrollment';
import { CreateStudent } from './create-student';
import { DeleteCourse } from './delete-course';
import { DeleteStudent } from './delete-student';
import { InactivateEnrollment } from './inactivate-enrollment';
import { UpdateCourse } from './update-course';
import { UpdateStudent } from './update-student';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'MutationType',
  fields: () => ({
    createStudent: CreateStudent,
    createCourse: CreateCourse,
    deleteStudent: DeleteStudent,
    deleteCourse: DeleteCourse,
    updateCourse: UpdateCourse,
    updateStudent: UpdateStudent,
    createEnrollment: CreateEnrollment,
    inactivateEnrollment: InactivateEnrollment,
  }),
});
