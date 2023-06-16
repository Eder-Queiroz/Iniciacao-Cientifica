export interface Professor {
    name: string,
    email: string
}

export interface Course {
    name: string,
    shift: string,
    group: string
}

export interface Classe {
    course: string,
    period: string,
    number_students: string
}

export interface Subject {
    subject: string,
    teacher: string,
    course: string,
    period: string,
    number_classes: string
}

export interface Restrictions {
    teacher: string,
    day: string,
    time: string
}

export interface Room {
    rooms: string,
    capacity: string,
    number_computers: string
}