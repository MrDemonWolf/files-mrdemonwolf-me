$(document).ready(() => {
  // Navbar Hover dropdown
  $('nav li.dropdown').hover(
    function () {
      $(this)
        .find('.dropdown-menu')
        .stop(true, true)
        .delay(100)
        .fadeIn(100);
    },
    function () {
      $(this)
        .find('.dropdown-menu')
        .stop(true, true)
        .delay(100)
        .fadeOut(100);
    }
  );
  $('.conditionize').conditionize();

  // hide the alert
  setInterval(() => {
    $('.alert.alert-timeout').hide();
  }, 15000);
  $('.conditional').conditionize({ updateOn: ['change'] });
  $.fn.datetimepicker.Constructor.Default = $.extend(
    {},
    $.fn.datetimepicker.Constructor.Default,
    {
      icons: {
        time: 'far fa-clock',
        date: 'far fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'far fa-calendar-check-o',
        clear: 'fas fa-trash',
        close: 'fas fa-times'
      }
    }
  );
});
