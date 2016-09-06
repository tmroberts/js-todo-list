'use strict';
if (this.ToDo === undefined) this.ToDo = {};

(function(context) {

  var $userInput = $('#item-input');
  console.log('This is $userInput: ', $userInput);
  var $userList = $('.list');


  function createListItem (value, id, isComplete) {
    var className = '';
    if (isComplete == 'true') {
      className = 'mark-completed';
    }

    //console.log('This is the result: ',data);
    var templateHtml = $('#list-template').html();
    var templateFunc = _.template(templateHtml);
    var html = templateFunc(
      {
        text: value,
        taskId: id,
        className: false
      });
      //put html on the pg
      $userList.append(html);
  }

  function deleteListItem(evt) {
    evt.stopPropagation();
    var $target = $(evt.target);
    var id = $target.parent().data('id');
    //var text = $target.data('text');
    console.log('This is evt.target: ', evt.target);
    console.log('Here is the target: ', id);
    console.log('Here is the id: ', id);
    // ajax call
    $.ajax({
     url: '/api/todo/' + id,
     method: 'DELETE',
    });
    $target.parent().remove();
  }

  //=========== Adding mark completed feature

  function markCompleted(evt) {
    console.log('Inside markCompleted');
    evt.stopPropagation();
    var $target = $(evt.target);
    var id  = $target.data('id');//looks for data-id
    var text = $target.data('text');//looks for data-text

      $.ajax({
        url: '/api/todo/' + id,
        method: 'PUT',
        data: {
          text: text,
          isComplete: true
        }
      });

      //$target.parent().addClass('mark-completed');
      $target.addClass('mark-completed');
  }

  //===========

  function getInput(evt) {
    // process <enter>
    if(evt.keyCode === 13 && $userInput.val() != '') {
      var value = $userInput.val();
      console.log('This is the list item: ', $userInput.val());

      $.ajax({
        url   : '/api/todo',
        method: 'POST',
        data  : {
          text: value,
          isComplete: false
        }
      })
      .done(function (data) {
        // isComplete is false
        // id is unknown
        // call createListItem
        createListItem(value, data, false);
      });
      $userInput.val('');
    }
  }

  function getInitialData() {
    // Initial display: (GET)
    $.ajax({
      url: 'api/todo'
    })
    .done(function(responseFromGET) {
      //responseFromGET.list
      responseFromGET.list.forEach(function(task) {
        createListItem(task.text, task.id, task.isComplete);
      });
    });
  }


  function start() {
    // Handle user input
    $userInput.on('keyup', getInput);
    $userInput.focus();
    getInitialData();
    var $list = $('.list');
    $list.on('click', '.delete-button', deleteListItem);
    $list.on('click', 'li', markCompleted);
  }

  context.start = start;

})(window.ToDo);
