<?php

require('../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Register view rendering
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

// Create Payment Intent with Stripe
\Stripe\Stripe::setApiKey('sk_test_U0Otn7howvy1l89A1Ef73T8o');

$intent = \Stripe\PaymentIntent::create([
    'amount' => 2000,
    'currency' => 'eur',
]);

echo($intent);

// Our web handlers

$app->get('/', function() use($app) {
  $app['monolog']->addDebug('logging output.');
  return $app['twig']->render('index.twig');
});

$app->get('/schedule', function() use($app) {
  $app['monolog']->addDebug('logging output.');
  return $app['twig']->render('schedule.twig');
});

$app->run();
