export interface Trail {
    _id?:string;
    trailName: string;
    locationCoordinates?: {
        type: "Point";
        coordinates: [number, number] 
    };
    country: string;
    difficultyLevel: string;
    hiked: boolean;
    dateHiked?: Date;
    rating?: number;
    picture?: string;
}
