'use strict';
if (this.ToDo === undefined) this.ToDo = {};

(function(context) {

  var $userInput = $('#item-input');
  var $userList = $('.list');




  function createListItem () {
    var value = $userInput.val();
    var templateHtml = $('#list-template').html();
    var templateFunc = _.template(templateHtml);
    $userList.append(html);

    var html = templateFunc(
      {
        text: $userInput.val()
      }
    );

    $userList.append(html);
    console.log('This is the list item: ', value);


    var promise = $.ajax({
      url: '/api/todo',
      method: 'POST',
      data: {
        text: $userInput.val()
      }
    })

    // This console.log isnt printing . . .
    promise.done(function (data) {
      console.log('This is the result: ',data);
    });

    $userInput.val(' ');

    // var promise = $.ajax({
    //   url: 'https://api.github.com/emojis'
    // });
    //
    // promise.done(function(data) {
    //   console.log(data);
    //
    //   addStuffByUsingLotsOfStringConcatenation(data);
    // });

  }

  function getInput(evt) {
    //$userList.empty();
    if(evt.keyCode === 13) {
      createListItem();
    }
  }



  function start() {
    $userInput.on('keyup', getInput);
    $userInput.focus();


  function initDisplay() {
    // Need: api GET here...to display the 'current' list

  }


  }

  context.start = start;

})(window.ToDo);
