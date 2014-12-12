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
  chatCont: $('#chat'),
  connectCont: $('#connect'),

  connect: function(name){
    if (!name) { return; }
    this.name = name;
    this.connectCont.hide();
    this.chatCont.show();
    $('#message-text').focus();
  },

  appendMessage: function(message){
    var line = $('<p>');
    if (message.from) {
      line.append ('<strong>' + message.from + '</strong> : ');
    }
    line.append(message.text);
    this.chatRoom.append(line);
    this.chatRoom.scrollTop(this.chatRoom[0].scrollHeight);
  },

  sendMessage: function(messageText){
    if (!messageText) { return; }
    $.post('/post_message', {
      text: messageText,
      name: this.name
    });
  }
};

$('form#message').on('submit', function(e){
  var message = $('#message-text').val();
  Chat.sendMessage(message);
  $('#message-text').val('');
  e.preventDefault();
});

$('form#connect').on('submit', function(e){
  var name = $('#name').val();
  Chat.connect(name);
  e.preventDefault();
});

$(function(){ 

  Chat.start();
  $('#name').focus();
  
});