/**
 * Created by Lalunashine on 5/28/17.
 */

var main = function() {
    // loading fadeIn
    $('body').fadeIn(500);
    
    // nav toggle
    $('.nav-icon').on('click', function() {
        var ul = $('nav a').parent();
        var cls = ul.attr('class');
        ul.toggleClass('inactive');
        ul.toggleClass('active');
    });

    // nav slide
    $('nav a').on('click', function(event) {
        if (this.href !== "") {
            event.preventDefault();

            var href = this.href;
            $('#slide').animate({ height: '+=1200px' }, 800);
            setTimeout(function() {
                window.location.href = href;
            }, 400);
        } // end if
    });

};


$(document).ready(main);
