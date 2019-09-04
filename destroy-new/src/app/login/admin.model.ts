export class Admin {
    cityName: string;
    theatreName: string;
    movieName: string;

    // tslint:disable-next-line:eofline
}

export class CityTheatre {
    ctCityId: number;
    ctTheatreId: number;
}

export class MovieTheatre {
    mtMovieId: number;
    mtTheatreId: number;
    mtShowtimeId: number;
    discount: number;
}

export class Showtime {
    showTimeId: number;
    showTimeValue: Date;
}