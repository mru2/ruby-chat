require 'sinatra'

class App < Sinatra::Base

  get '/join_room' do
    content_type 'text/event-stream'

    puts 'Somebody joined the chat!'
  end

end