$(function(){
  function buildHTML(message){
    if (message.image){
      let html =
        `<div class="chat-main__message-list--block" data-message-id=${message.id}>
          <div class="block-name">
            <div class="block-name__left">
              ${message.user_name}
            </div>
            <div class="block-name__right">
              ${message.created_at}
            </div>
          </div>
          <div class="block-message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message-list--block" data-message-id=${message.id}>
        <div class="block-name">
          <div class="block-name__left">
            ${message.user_name}
          </div>
          <div class="block-name__right">
            ${message.created_at}
          </div>
        </div>
        <div class="block-message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.chat-main__message-list--block:last').data("message-id") || 0;
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});