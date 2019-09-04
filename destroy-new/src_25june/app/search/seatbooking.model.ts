export class SeatBooking {
    sbCityId: string;
    sbTheatreId: string;
    sbMovieId: string;
    sbShowTime: string;
    sbSeatName: string;
    sbDate: string;
    sbUserId: string;
    status: string;
}

export class MovieTheatre {
    mtMovieId: string;
    mtTheatreId: string;
}

export class ConfirmSeatMail {
    id: number;
    date: string;
    time: string;
    totalSeats: string;
    seatNames: Array<string> = new Array;
    movieId: string;
    theatreId: string;
}
