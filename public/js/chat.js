var Chat = {
  start: function(){
    console.log('Joining the chat...');
    var source = new EventSource('/join_room');

    var self = this;
    source.addEventListener('message', function(event){
      self.appendMessage(JSON.parse(event.data));
    });

    this.appendMessage({text: "Welcome to the chat"});
  },

  chatRoom: $('#chatroom'),

  appendMessage: function(message){
    var line = $('<p>');
    line.html(message.text);
    this.chatRoom.append(line);
    this.chatRoom.scrollTop(this.chatRoom[0].scrollHeight);
  }
};

$('form').on('submit', function(e){
  $.post('/post_message', $(this).serialize());
  $(this).find('input[type="text"]').val('');
  e.preventDefault();
});

$(function(){ Chat.start(); });