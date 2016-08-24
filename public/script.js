'use strict';
if (this.ToDo === undefined) this.ToDo = {};

(function(context) {

  var $userInput = $('#item-input');
  console.log('This is $userInput: ', $userInput);
  var $userList = $('.list');


  function createListItem () {
    var value = $userInput.val();
    var templateHtml = $('#list-template').html();
    var templateFunc = _.template(templateHtml);
    var html = templateFunc(
      {
        text: $userInput.val()
      }
    );

    $userList.append(html);
    console.log('This is the list item: ', value);

    var promise = $.ajax({
      url   : '/api/todo',
      method: 'POST',
      data  : {
        text: $userInput.val(),
        isComplete: false
      }
    });

    promise.done(function (data) {
      console.log('This is the result: ',data);
    });

    $userInput.val(' ');

  }

  function getInput(evt) {
    //$userList.empty();
    if(evt.keyCode === 13) {
      createListItem();
    }
  }


  function start() {

    // Initial display: (GET)
    //
    // var promise = $.ajax({
    //   url: '/api/todo',
    //   method: 'GET',
    //   data: {}
    // });
    //
    // promise.done(function (data) {
    //   console.log('This is data frao the API: ', data);
    // });

    // When I get data back, loop thru the array of objects...
    // in theory . . . something like :
    // for(var i = 0; i < data.list.length; i++) {
    //
    // }

    // Handle user input
    $userInput.on('keyup', getInput);
    $userInput.focus();
  }

  context.start = start;

})(window.ToDo);
