import { CourseInformation } from './course-information';
import { ElementTypes } from '../shared/constants/element_types';
import { Teacher } from './teacher';
import { Location } from './location';

export class Appointment {
    uuid: string;
    dateStart: Date;
    dateEnd: Date;
    timeStartHours: number;
    timeStartMinutes: number;
    timeEndHours: number;
    timeEndMinutes: number;
    course: CourseInformation;
    teacher: Teacher;
    location: Location;
}
