'use strict';
if (this.ToDo === undefined) this.ToDo = {};

(function(context) {

  var $userInput = $('#item-input');
  console.log('This is $userInput: ', $userInput);
  var $userList = $('.list');


  function createListItem () {
    var value = $userInput.val();
    console.log('This is the list item: ', value);

    var promise = $.ajax({
      url   : '/api/todo',
      method: 'POST',
      data  : {
        text: value,
        isComplete: false
      }
    });

    promise.done(function (data) {
      //console.log('This is the result: ',data);

      var templateHtml = $('#list-template').html();
      var templateFunc = _.template(templateHtml);
      var html = templateFunc(
        {
          text: value,
          taskId: data.id
        }
      );
      $userList.append(html);
    });

    $userInput.val('');

  }

  function deleteListItem(evt) {
    var $target = $(evt.target);
    var id = $target.data('id');
    console.log('Delete button active!');
    console.log('Here is the target: ', id)
    console.log('Here is the id: ', id)
    // ajax call
    $.ajax({
     url: '/api/todo/' + id,
     method: 'DELETE'
    });

    $target.parent().remove();

  }

//=========== Adding mark completed feature

function markCompleted(evt) {
  console.log('Inside markCompleted');
    var $target = $(evt.target);
    var id  = $target.data('id');
    var text = $target.data('text');

    $.ajax({
      url: '/api/todo/' + id,
      method: 'PUT',
      data: {
        text: text,
        id: id,
        isComplete: true
      }
    });

    $target.parent().addClass('mark-completed');
  }

//===========

  function getInput(evt) {
    if(evt.keyCode === 13) {
      createListItem();
      //$userList.empty();
    }
  }


  function start() {

  // Initial display: (GET)
  var promise = $.ajax({
    url: '/api/todo',
    method: 'GET'
  });

  promise.done(function (data) {
    console.log('This is data from the API: ', data);

    for(var i = 0; i < data.list.length; i++) {
          // mark completed
          var className = '';
          var isComplete = data.list[i].isComplete
          console.log('This is isComplete: ', isComplete);

          if (isComplete == 'true') {
            className = 'mark-completed';
          }
          //
          var templateHtml = $('#list-template').html();
          var templateFunc = _.template(templateHtml);
          var html = templateFunc(
            {
              text: data.list[i].text,
              taskId: data.list[i].id,
              className: data.list[i].className
            }
          );
          //put html on the pg
          $('.list').append(html);
    }
  });

  // Handle user input
  $userInput.on('keyup', getInput);
  $userInput.focus();

  // Listener for Delete button
  var $list = $('.list');
    $list.on('click', '.delete-button', deleteListItem);
    $list.on('click', markCompleted);
  }

  context.start = start;

})(window.ToDo);
