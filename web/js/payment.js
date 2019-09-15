var stripe = Stripe('pk_test_8oWI4fD0zgVXlMJavJNJpaHk');

var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');

var cardholderName = document.getElementById('cardholder-name');
var cardholderEmail = document.getElementById('cardholder-email');
var playerName = document.getElementById('player-name');

var cardButton = document.getElementById('card-button');
var clientSecret = document.getElementById('client-secret').value;

cardButton.addEventListener('click', function(ev) {
  stripe.handleCardPayment(
    clientSecret, cardElement, {
      payment_method_data: {
        billing_details: {
          name: cardholderName.value, 
          email: cardholderEmail.value
        },
        metadata: {
          player_name: playerName.value
        }
      },
      receipt_email: cardholderEmail.value,
      description: playerName.value
    }
  ).then(function(result) {
    if (result.error) {
      // Display error.message in your UI.
    } else {
      // The payment has succeeded. Display a success message.
    }
  });
});