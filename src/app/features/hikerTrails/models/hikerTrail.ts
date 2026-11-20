export interface HikerTrail {
    _id:string;
    trail: string;
    hiker: string;
    dateHiked: Date;
    rating: number;
    picture?: string;
}

export interface CreateHikerTrailDto{
    trail: string;
    hiker: string;
    dateHiked: string;
    rating?: number;
    picture?: string;
}

export interface UpdateHikerTrailDto{
    trail: string;
    hiker: string;
    dateHiked: string;
    rating?: number;
    picture?: string;
}

export interface HikerTrailList{
    hikerTrails: HikerTrail[];
}