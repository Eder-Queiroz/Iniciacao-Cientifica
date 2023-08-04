export interface Teacher {
  name: string;
  email: string;
}

export interface Course {
  name: string;
  shift: string;
}

export interface Class {
  name: string;
  course_id: string;
  period: number;
  num_students: number;
}

export interface Discipline {
  name: string;
  period: number;
}

export interface Restrictions {
  teacher_id: string;
  day: number;
  period: string;
}

export interface Room {
  name: string;
  capacity: number;
  fixed: boolean;
  class_id:string;
  building:string;
}

export interface Classroom{
  amount: number;
  duration:number;
  teacher_id: string;
  discipline_id: string;
  room_id: string;
  course_id:string;
  class_id:string;
}

export interface Groups{
  group1:   string;
  group2:  string;
  group3:  string;
  group4:  string;
  class_id: string;
}