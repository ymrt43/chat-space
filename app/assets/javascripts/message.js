$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Chat">
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
        `<div class="Chat">
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
      // $('.Chat').append(html);
      // $('.Form__inputContent--textfield').val('');
      // $('.Form__submit').prop('disabled', false);
    })
  })
});