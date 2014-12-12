require 'sinatra'
require 'json'

class App < Sinatra::Base

  set :public_folder, File.dirname(__FILE__) + '/public'
  set :users, []

  def message(data)
    "data: #{data.to_json}\n\n"
  end

  get '/' do
    send_file File.join(settings.public_folder, 'index.html')
  end


  get '/join_room' do
    content_type 'text/event-stream'

    stream(:keep_open) do |connection|
      puts 'Somebody joined the chat!'
      settings.users << connection

      # On close
      connection.callback do
        puts 'Somebody left the chat :('
        settings.users.delete(connection)
      end
    end
  end


  post '/post_message' do
    puts "New message from : #{params[:name]} : #{params[:text]}"

    settings.users.each do |connection|
      connection << message(from: params[:name], text: params[:text])
    end

    halt 200
  end

end