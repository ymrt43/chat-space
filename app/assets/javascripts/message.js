$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Chat" data-message-id=${message.id}>
          <div class="Chat__info">
            <div class="Chat__info--name">
              ${message.user.name}
            </div>
            <div class="Chat__info--dateTime">
              ${message.created_at}
            </div>
          </div>
          <div class="Chat__message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
        return html;
      } else {
        let html =
        `<div class="Chat" data-message-id=${message.id}>
          <div class="Chat__info">
            <div class="Chat__info--name">
              ${message.user_name}
            </div>
            <div class="Chat__info--dateTime">
              ${message.created_at}
            </div>
          </div>
          <div class="Chat__message">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    };
  }
  
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.ChatMain__message--list').append(html);
      $('form')[0].reset();
      $('.ChatMain__message--list').animate({ scrollTop: $('.ChatMain__message--list')[0].scrollHeight});
      $('.Form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  let reloadMessages = function() {
    let last_message_id = $('.Chat:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.ChatMain__message--list').append(insertHTML);
        $('.ChatMain__message--list').animate({ scrollTop: $('.ChatMain__message--list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});