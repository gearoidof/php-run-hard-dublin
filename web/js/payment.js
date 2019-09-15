var stripe = Stripe('pk_test_8oWI4fD0zgVXlMJavJNJpaHk');

var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');