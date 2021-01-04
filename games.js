/* Formatting function for row details - modify as you need */
function format ( d ) {
  // `d` is the original data object for the row
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
          '<td>'+d.thoughts+'</td>'+
      '</tr>'+
  '</table>';
}

$(document).ready(function() {
  var table = $('#table_id').DataTable( {
      "ajax": "games.txt",
      "columns": [
          { "data": "name" },
          { "data": "format"},
          { "data": "platform"},
          { "data": "status" },
          { 
            "data": "rating",
            "className": 'details-control dt-right'
          }
      ],
      "order": [[0, 'asc']],
      "paging": false
  } );
   
  // Add event listener for opening and closing details
  $('#table_id tbody').on('click', 'td.details-control', function () {
      var tr = $(this).closest('tr');
      var row = table.row( tr );

      if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
      }
      else if ( row.data().trueIfHasChild === 1 ) {
          // Open this row
          row.child( format(row.data()) ).show();
          tr.addClass('shown');
      }
  } );
} );