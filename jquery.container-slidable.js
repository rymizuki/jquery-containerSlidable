/*! 
 * jquery.container-slidable.js
 * @author @mizuki_r
 * @version 0.0.1
 */
function () {
  "use strict";
 
  $.fn.containerSlidable = (function (args) {
    var config = $.extend({
      main   : '#cslidable-main',
      hide   : '#cslidable-hide',
      mask   : '#cslidable-mask',
      open_trigger : '#cslidable-open',
      close_trigger: '#cslidable-close',
      distance : ['200px', '0']
    }, args);
    
    var $target = this;
    var $c_main = $(config.main);
    var $c_hide = $(config.hide);
    
    console.log('start regsiter containerSlideable');
    
    $target
      .on('cslidable:open', function (e) {
        if ($target.data('cslidable-opening')) return;
        $target.data('cslidable-opening', true);
    
        e.preventDefault();
    
        $target.trigger('cslidable:beforeOpen');
    
        $c_hide.css({"display" : 'block', 'min-height' : '1000px'});
        $c_main
          .on("webkitTransitionEnd", function () {
            $c_hide.addClass("cslidable-enable");
            $(this).off("webkitTransitionEnd");
            $target
              .data('cslidable-opening', false)
              .trigger('cslidable:openEnd');
          })
          .css({"-webkit-transform" : "translate("+config.distance.join(",")+")"})
          .prepend('<div id="'+config.mask.substr(1)+'"></div>')
        ;
      })
      .on('cslidable:close', function (e) {
        e.preventDefault();
        if (!$c_hide.hasClass('cslidable-enable')) { return; }
    
        $target.trigger('cslidable:beforeClose');
    
        $c_hide.removeClass('cslidable-enable');
        $c_main
          .on("webkitTransitionEnd", function () {
            $c_hide.css({'display' : 'none', 'min-height' : '0'});
            $(this).off("webkitTransitionEnd");
            $target.trigger('cslidable:closeEnd');
          })
          .css({"-webkit-transform" : 'translate(0, 0)'})
        ;
        $(config.mask).remove();
      })
      .on('click', config.open_trigger, function () {
        $(this).trigger('cslidable:open');
      })
      .on('click', config.mask, function(e) {
        e.preventDefault();
        $target.trigger('cslidable:close');
      })
    ;
    return $target;
  });
})();
