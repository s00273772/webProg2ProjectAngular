export interface Hiker {
    _id:string;
    username: string;
    email: string;
    password: string;
    country: string;
}

export interface CreateHikerDto{
    username: string;
    email: string;
    password: string;
    country: string;
}

export interface UpdateHikerDto{
    username: string;
    email: string;
    password: string;
    country: string;
}