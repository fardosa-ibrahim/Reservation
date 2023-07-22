document.getElementById("reservationForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var checkInDate = document.getElementById("checkInDate").value;
  var checkOutDate = document.getElementById("checkOutDate").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  // Perform reservation processing (e.g., send data to the server)
  // You can use AJAX or fetch API to send the form data to the server

  // Display reservation status
  var status = document.getElementById("reservationStatus");
  status.innerHTML = "Reservation confirmed for " + name + ". Check-in: " + checkInDate + ", Check-out: " + checkOutDate;
  // You can also update the UI based on the response from the server
});