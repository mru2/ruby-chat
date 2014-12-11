require 'sinatra'

class App < Sinatra::Base

  get '/join_room' do
    content_type 'text/event-stream'

    stream(:keep_open) do |connection|
      connection << "data: Welcome to the chat!\n\n" # Will be sent multiple times if no keep-alive frames are sent through the connection. Will be fixed in v1 anyway ^^
    end

    puts 'Somebody joined the chat!'
  end

end