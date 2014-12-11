var Chat = {
  start: function(){
    var source = new EventSource('/join_room');
  }
};

$(function(){ Chat.start(); });