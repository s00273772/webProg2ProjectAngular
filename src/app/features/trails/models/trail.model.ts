export interface Trail {
    _id:string;
    trailName: string;
    locationCoordinates?: {
        type: "Point";
        coordinates: [number, number] 
    };
    country: string;
    difficultyLevel: string;
}

export interface CreateTrailDto{
    trailName: string;
    locationCoordinates?: {
        type: "Point";
        coordinates: [number, number] 
    };
    country: string;
    difficultyLevel: string;
}

export interface UpdateTrailDto{
    trailName: string;
    locationCoordinates?: {
        type: "Point";
        coordinates: [number, number] 
    };
    country: string;
    difficultyLevel: string;
}

//ChatGPT needed to create an interface for the trails object as the trails are stored inside a trails object
export interface TrailList{
    trails: Trail[];
}


