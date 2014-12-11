require 'rack/contrib'
require './app.rb'

use Rack::TryStatic,
  root: 'public',
  urls: %w[/css /js],
  try: ['.html', 'index.html', '/index.html']

run App