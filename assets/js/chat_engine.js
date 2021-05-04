class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:7000");

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "codeial_room",
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined!", data);
      });

      // CHANGE :: send a message on clicking the send message button
      $("#send-message").click(function () {
        let msg = $("#chat-message-input").val();

        if (msg != "") {
          self.socket.emit("send_message", {
            message: msg,
            user_email: self.userEmail,
            chatroom: "codeial_room",
          });
        }
      });

      self.socket.on("receive_message", function (data) {
        console.log("message received", data.message);

        let newMessage = $("<li>");

        let messageType = "other-message";

        if (data.user_email == self.userEmail) {
          messageType = "self-message";
        }

        newMessage.append(
          $("<span>", {
            html: data.message,
          })
        );

        newMessage.append(
          $("<sub>", {
            html: data.user_email,
          })
        );

        newMessage.addClass(messageType);

        $("#chat-messages-list").append(newMessage);
      });
    });
  }
}
// till here

//this is frontend established for creating a connection
//this class is to send a connection
//console.log("hello");
// class ChatEngine{
//     constructor(chatBoxId, userEmail) {
//        this.chatBox = $(`#${chatBoxId}`);
//        this.userEmail = userEmail;
//       //here you need to initiate a connection on which port I run a socket server

//       this.socket = io.connect('http://localhost:7000');

//       if(this.userEmail) {
//           this.connectionHandler();
//       }
//     }

//     //create a connection Handler

//     //on is detecting a event
//     connectionHandler(){

//         const self = this;
//      this.socket.on('connect', function() {
//          console.log('connection established using socket');

//          self.socket.emit('join_room', {    //.emit --> sending a event
//              user_email: self.userEmail,
//              chatroom: 'codeial_room'
//          });

//          self.socket.on('user_joined', function(data) {
//              console.log('a user joined', data)
//          })
//      });

//      //CHANGE ::  send a message on clicking the send message button
//        $('#send-message').click(function() {
//            let msg = $('#chat-message-input').val();

//            if(msg != '') {
//                self.socket.emit('send_message', {
//                    message: msg,
//                    user_email: self.userEmail,
//                    chatroom: 'codeial_room'
//                } );
//            }
//        });

//        self.socket.on('receive_msg', function(data) {
//            console.log('message-received', data.message);

//        let newMessage = $('<li>');

//        let messageType = 'other-message';

//        if(data.user_email == self.userEmail) {
//            messageType = 'self-message';
//        }

//        newMessage.append($('<span>', {
//            'html': data.message
//        }));
//     console.log(data.message);
//        newMessage.appned($('<sub>', {
//            'html': data.user_email
//        }));
//        newMessage.addClass(messageType);

//        $('#chat-messages-list').appned(newMessage);

//     });
// }

// }
