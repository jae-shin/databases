document.addEventListener('DOMContentLoaded', function() {

  const defaultRoomname = 'all';
  // const startTimeForCreatedAt = '2001-01-00T00:00:00.000Z';
  const startId = 0;

  window.app = {
    server: 'http://127.0.0.1:3000/classes/messages',
    username: window.location.search.slice(10).trim(),
    roomnames: {defaultRoomname: true},
    friends: {},
    // mostRecentCreatedAt: startTimeForCreatedAt,
    mostRecentAddedMessageId: startId,

    init: function() {
      $('#chats').on('click', '.username', app.addFriend);
      $('#send').on('submit', app.handleSubmit);
      $('#roomSelect').on('change', app.handleRoomChange);

      app.fetch();
      setInterval(app.fetch, 5000);
    },

    send: function(message) {
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          if (message.roomname !== $('#roomSelect').val()) {
            app.addRoom(message.roomname);
            $('#roomSelect').val(message.roomname).trigger('change');
          } else {
            app.fetch();
          }
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message', data);
        }
      });
    },

    // option is true when invoking fetch right after a room change
    fetch: function(option) { 
      // if (option) {
      //   app.mostRecentCreatedAt = startTimeForCreatedAt;
      // }

      let queryObject = {
        // order: '-createdAt',
        // where: {createdAt: {$gt: app.mostRecentCreatedAt}}
      };

      roomname = $('#roomSelect option:selected').text();
      if (roomname !== defaultRoomname) {
        queryObject.where.roomname = roomname;
      }

      $.ajax({
        url: app.server,
        type: 'GET',
        data: queryObject,
        contentType: 'application/json',
        success: function (data) {
          // data no longer has a results property, 
          // data itself is the array of message objects
          let messages = JSON.parse(data);
          if (messages.length === 0) {
            return;
          }
          
          // app.mostRecentCreatedAt = messages[0].createdAt;
          
          var latestAddedMessageIndex = messages.length - 1;
          while (latestAddedMessageIndex > -1 
            && messages[latestAddedMessageIndex].id > app.mostRecentAddedMessageId) {
            latestAddedMessageIndex--;
          }

          app.mostRecentAddedMessageId = messages[messages.length - 1].id;
          
          for (var j = latestAddedMessageIndex + 1; j < messages.length; j++) {
            app.addMessage(messages[j]);
          }

          if (option) {
            app.clearMessages();
          }

          messages.forEach(message => app.addRoom(message.roomname));

          console.log('chatterbox: Message(s) retreived');
        },
        error: function (data) {
          console.error('chatterbox: Failed to retreive message(s)', data);
        }
      });
    },

    clearMessages: function() {
      $('#chats').empty();
    },

    addMessage: function(message) {
      var isFriend = message.username in app.friends;
      let $username = $('<span class="username"/> ').text(message.username);
      let $text = $('<span class="message"/>').text(`: ${message.text}`);
      if (isFriend) {
        $username.addClass('friend');
        $text.addClass('bold');
      }
      let $message = $('<div class="chat"/>').attr('roomname', message.roomname).append($username, $text);
      $('#chats').prepend($message);
    },

    addRoom: function(roomname) {
      if (!(roomname in app.roomnames)) {
        app.roomnames[roomname] = true;
        let $roomname = $('<option/>').val(roomname).text(roomname);
        $('#roomSelect').append($roomname);
      }
    },

    addFriend: function(event) {
      var username = $(event.target).text();
      if (username in app.friends) {
        delete app.friends[username];
      } else {
        app.friends[username] = true;
      }
      $('#chats .username').filter(function(index, usernameEl) {
        return $(usernameEl).text() === username;
      }).toggleClass('friend').next().toggleClass('bold');
    },

    handleSubmit: function(event) {
      let roomname = $('#roomname').val();
      if (roomname === '') {
        roomname = $('#roomSelect option:selected').val();
      }
      let message = {
        username: app.username,
        message: $('#message').val(),
        roomname: roomname
      };
      $('#message').val('');
      $('#roomname').val('');
      app.send(message);
      event.preventDefault();
    },

    handleRoomChange: function() {
      app.fetch(true);
    }
  };

  app.init();
});

