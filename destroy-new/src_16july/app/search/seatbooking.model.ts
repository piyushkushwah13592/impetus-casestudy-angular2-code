export class SeatBooking {
    sbCityId: number;
    sbTheatreId: number;
    sbMovieId: number;
    sbShowTime: string;
    sbSeatName: string;
    sbDate: string;
    sbUserId: number;
    status: string;
}

export class MovieTheatre {
    mtMovieId: number;
    mtTheatreId: number;
}

export class ConfirmSeatMail {
    id: number;
    date: string;
    time: string;
    totalSeats: string;
    seatNames: Array<string> = new Array;
    movieId: number;
    theatreId: number;
    movieName: string;
    theatreName: string;
}
