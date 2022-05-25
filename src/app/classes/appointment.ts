import { CourseInformation } from "./course-information";
import { ZenkitLocation } from "./location";
import { Teacher } from "./teacher";

export class Appointment {
  uuid: string;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  dayIndex: number;
  timeStartHours: number;
  timeStartMinutes: number;
  timeEndHours: number;
  timeEndMinutes: number;
  course: CourseInformation;
  teacher: Teacher;
  location: ZenkitLocation;
  levels: any[];
  ageGroups: any[];
}
