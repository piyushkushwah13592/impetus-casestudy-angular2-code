import { SeatBooking, MovieTheatre, ConfirmSeatMail } from './seatbooking.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
    constructor(private _http: Http) { }

    S_getCities() {
        return this._http.get('http://localhost:8080/mymovieportal/city/getCities').map(
            (response: Response) => response.json()
        );
    }
    S_getTheatres(cityId: string) {
        return this._http.get('http://localhost:8080/mymovieportal/theatre/getTheatres/' + cityId).map(
            (response: Response) => response.json()
        );
    }
    S_getMovies(theatreId: string) {
        return this._http.get('http://localhost:8080/mymovieportal/movie/getMovies/' + theatreId).map(
            (response: Response) => response.json()
        );
    }

    S_getTimes(movieTheatre: MovieTheatre) {
        return this._http.post('http://localhost:8080/mymovieportal/movie/getShowtime', movieTheatre).map(
            (response: Response) => response.json()
        );
    }

    S_getSeats(seatbooking: SeatBooking) {
        return this._http.post('http://localhost:8080/mymovieportal/seatbooking/getSeatName', seatbooking).map(
            (response: Response) => response.json()
        );
    }
    S_setSeats(seatbooking: SeatBooking[]) {
        return this._http.post('http://localhost:8080/mymovieportal/seatbooking/setSeatName', seatbooking).map(
            (response: Response) => response.json()
        );
    }

    S_confirmSeatMail(confirmSeatMail: ConfirmSeatMail) {
        return this._http.post('http://localhost:8080/mymovieportal/mail/confirmSeatMail', confirmSeatMail).map(
            (response: Response) => response.json()
        );
    }

    S_cancelSeatMail(cancelSeatMail: ConfirmSeatMail) {
        return this._http.post('http://localhost:8080/mymovieportal/mail/cancelSeatMail', cancelSeatMail).map(
            (response: Response) => response.json()
        );
    }

    S_getUserHistory(sbUserId: number) {
        return this._http.get('http://localhost:8080/mymovieportal/seatbooking/getUserHistory/' + sbUserId).map(
            (response: Response) => response.json()
        );
    }
    S_CancelTicket(sbUserId: number) {
        return this._http.get('http://localhost:8080/mymovieportal/seatbooking/cancelTicket/' + sbUserId).map(
            (response: Response) => response.json()
        );
    }

    S_goToCancelTicket(seatBookingId: number) {
        return this._http.get('http://localhost:8080/mymovieportal/seatbooking/goToCancelTicket/' + seatBookingId).map(
            (response: Response) => response.json()
        );
    }

    S_getDiscount(movieTheatre: MovieTheatre) {
        return this._http.post('http://localhost:8080/mymovieportal/movie/getDiscount', movieTheatre).map(
            (response: Response) => response.json()
        );
    }

    S_getMovie(movieId: string) {
        return this._http.get('http://localhost:8080/mymovieportal/movie/getMovie/' + movieId).map(
            (response: Response) => response.json()
        );
    }

}
