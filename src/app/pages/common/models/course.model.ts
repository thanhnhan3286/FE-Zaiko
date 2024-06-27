import { HttpClientResponse } from "@core/models";

export interface Course {
    companyId: number;
    routeCode: string;
    courseCode: string;
    courseName: string;
}
export interface HttpCourseResponse extends HttpClientResponse {
    data: Course[];
}
