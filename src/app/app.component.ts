import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //Define the seat layout as a 2D array. Each seat has a number and a 'booked' status.
  coach: { number: number; booked: boolean }[][] = [];
  seatsToBook: number = 0; //Number of seats user wants to book
  bookedSeats: number[] = []; //Array to hold the booked seat numbers
  constructor() {
    this.initializeCoach();
  }
  //Initialize the coach with 80 seats and pre-booked seats.
  initializeCoach() {
    const preBookedSeats = new Set([17, 18, 62]); //Using Set for O(1) lookup
    let seatNumber = 1;

    //Create 10 rows of 7 seats each
    for (let i = 0; i < 11; i++) {
      this.coach.push(this.createRow(7, seatNumber, preBookedSeats));
      seatNumber += 7;
    }
    //Create the last row with 3 seats
    this.coach.push(this.createRow(3, seatNumber, preBookedSeats));
  }

  //Helper function to create a row with specified number of seats
  private createRow(
    numSeats: number,
    startNumber: number,
    preBookedSeats: Set<number>
  ) {
    return Array.from({ length: numSeats }, (_, index) => ({
      number: startNumber + index,
      booked: preBookedSeats.has(startNumber + index),
    }));
  }
  //Function to book seats based on user input
  bookSeats() {
    if (this.seatsToBook < 1 || this.seatsToBook > 7) {
      alert('You can only book between 1 and 7 seats.');
      return;
    }
    const bookedSeatsForUser: number[] = [];
    let seatsLeftToBook = this.seatsToBook;

    //Try to book all seats in one row if possible
    for (const row of this.coach) {
      const availableSeatsInRow = row.filter((seat) => !seat.booked);
      if (availableSeatsInRow.length >= seatsLeftToBook) {
        this.bookSeatsInRow(
          availableSeatsInRow,
          seatsLeftToBook,
          bookedSeatsForUser
        );
        seatsLeftToBook = 0;
        break;
      }
    }

    //If there are still seats left to book, book nearby seats
    if (seatsLeftToBook > 0) {
      this.bookNearbySeats(seatsLeftToBook, bookedSeatsForUser);
    }

    //Provide feedback to the user
    if (seatsLeftToBook > 0) {
      alert('Sorry, not enough seats available.');
    } else {
      this.bookedSeats = bookedSeatsForUser;
      alert(`Seats booked: ${this.bookedSeats.join(', ')}`);
    }
  }

  //Helper function to book seats in a row
  private bookSeatsInRow(
    availableSeats: { number: number; booked: boolean }[],
    count: number,
    bookedSeatsForUser: number[]
  ) {
    for (let i = 0; i < count; i++) {
      availableSeats[i].booked = true;
      bookedSeatsForUser.push(availableSeats[i].number);
    }
  }

  //Helper function to book nearby seats across multiple rows
  private bookNearbySeats(
    seatsLeftToBook: number,
    bookedSeatsForUser: number[]
  ) {
    for (const row of this.coach) {
      const availableSeatsInRow = row.filter((seat) => !seat.booked);
      if (availableSeatsInRow.length > 0) {
        this.bookSeatsInRow(
          availableSeatsInRow,
          Math.min(seatsLeftToBook, availableSeatsInRow.length),
          bookedSeatsForUser
        );
        seatsLeftToBook -= Math.min(
          seatsLeftToBook,
          availableSeatsInRow.length
        );
        if (seatsLeftToBook === 0) break;
      }
    }
  }

  //Function to return the seat availability status for display
  isSeatBooked(seat: { number: number; booked: boolean }) {
    return seat.booked ? 'booked' : 'available';
  }
}
