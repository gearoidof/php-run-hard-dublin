var stripe = Stripe('pk_test_8oWI4fD0zgVXlMJavJNJpaHk');//pk_live_YPgBIdC8IkGbafdUCIjfI30K');

var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');

var cardholderName = document.getElementById('cardholder-name');
var cardholderEmail = document.getElementById('cardholder-email');
var playerName = document.getElementById('player-name');

var cardButton = document.getElementById('card-button');
var clientSecret = document.getElementById('client-secret').value;

cardButton.addEventListener('click', function(ev) {
  cardButton.disabled = true;
  cardButton.textContent = 'Processing…';

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
      receipt_email: cardholderEmail.value
    }
  ).then(function(result) {
    const mainElement = document.getElementById('main_form');
    const confirmationElement = document.getElementById('confirmation');
    document.getElementById('payment-space').outerHTML = "";
    if (result.error) {
      confirmationElement.querySelector('.error-message').innerText =
        result.error.message;
      mainElement.classList.add('error');
    } else {

      confirmationElement.querySelector('.note').innerText =
        "We just sent your receipt to your email address, We'll be in touch soon with more details.";
      mainElement.classList.add('success');
    }
  });
});