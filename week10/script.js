//jQuery plugin to add hover highlight effect on table rows
$.fn.rowHighlight = function() {
  this.hover(
    function() {
      $(this).addClass('highlighted');
    },
    function() {
      $(this).removeClass('highlighted');
    }
  );
  return this; 
};

$(document).ready(function() {
  $.getJSON('colors.json', function(data) {
    let tbody = $('#colors-table tbody');
    $.each(data.colors, function(i, color) {

      let rgbStr = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;

      let row = $('<tr></tr>');

      let swatch = $('<td></td>').append(
        $('<div></div>')
          .addClass('color-swatch')
          .css('background-color', color.hex)
      );

      let name = $('<td></td>').text(color.name);
      let hex = $('<td></td>').text(color.hex);
      let rgb = $('<td></td>').text(rgbStr);
      let category = $('<td></td>').text(color.category);

      row.append(swatch, name, hex, rgb, category);
      tbody.append(row);
    });

    $('#colors-table tbody tr').rowHighlight();
  });
});
