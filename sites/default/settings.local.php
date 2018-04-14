<?php

$databases['default']['default'] = array (
  'database' => 'miteshmap',
  'username' => 'root',
  'password' => 'root',
  'prefix' => 'drup_',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);

$settings['install_profile'] = 'standard';
$config_directories['sync'] = 'config/sync';


$settings['trusted_host_patterns'] = [
  '^www\.miteshmap\.com$',
  '^miteshmap\.com$',
  '^local\.miteshmap\.com$',
];
