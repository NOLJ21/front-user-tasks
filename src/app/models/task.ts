import {User} from "./user";

export interface Task{
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    user: User
}
