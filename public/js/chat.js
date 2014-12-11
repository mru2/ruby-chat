var Chat = {
  start: function(){
    console.log('Joining the chat...');
    var source = new EventSource('/join_room');

    var self = this;
    source.addEventListener('message', function(event){
      self.appendMessage({text: event.data});
    });
  },

  appendMessage: function(message){
    var line = $('<p>');
    line.html(message.text);
    $('#chatroom').append(line);
  }
};

$(function(){ Chat.start(); });