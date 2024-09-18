-- Create the Seats table
CREATE TABLE Seats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seat_number INT NOT NULL,
  row_number INT NOT NULL,
  column_number INT NOT NULL,
  booked BOOLEAN DEFAULT FALSE,
  UNIQUE(seat_number)
);
-- Insert example data
INSERT INTO Seats (seat_number, row_number, column_number, booked) VALUES
(1, 1, 1, FALSE),
(2, 1, 2, FALSE),
(3, 1, 3, FALSE),
(4, 1, 4, FALSE),
(5, 1, 5, FALSE),
(6, 1, 6, FALSE),
(7, 1, 7, FALSE),
-- Continue for all seats in rows 1 through 10
(71, 11, 1, FALSE),
(72, 11, 2, FALSE),
(73, 11, 3, TRUE); -- Pre-booked seat example
