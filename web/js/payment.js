var stripe = Stripe('pk_test_8oWI4fD0zgVXlMJavJNJpaHk');

var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');

var cardholderName = document.getElementById('cardholder-name');
var cardButton = document.getElementById('card-button');
var clientSecret = document.getElementById('client_secret');

cardButton.addEventListener('click', function(ev) {
  console.log("click");
  console.log(cardholderName.value);
  stripe.handleCardPayment(
    clientSecret, cardElement, {
      payment_method_data: {
        billing_details: {name: cardholderName.value}
      }
    }
  ).then(function(result) {
    if (result.error) {
      // Display error.message in your UI.
    } else {
      // The payment has succeeded. Display a success message.
    }
  });
});