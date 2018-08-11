import { CourseInformation } from './course-information';
import { ElementTypes } from '../shared/constants/element_types';

export class Appointment {
    timeStartHours: number;
    timeStartMinutes: number;
    timeEndHours: number;
    timeEndMinutes: number;
    course: CourseInformation;
}
