require 'rack/contrib'
require './app.rb'

use Rack::TryStatic,
  root: 'public',
  urls: %w[/],
  try: ['.html', 'index.html', '/index.html']

run App