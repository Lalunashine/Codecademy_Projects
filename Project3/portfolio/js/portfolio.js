/**
 * Created by Lalunashine on 5/28/17.
 */

var main = function() {

    $('body').fadeIn(500);

    $('.nav-icon').on('click', function() {
        $('nav a').toggleClass('inactive');
    });

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

    $('.work div img').mouseenter(function() {
        $(this).animate({ width: '+=15px', height: '+=15px' }, 500);
    });
    $(".work div img").mouseleave(function() {
        $(this).animate({ width: '-=15px', height: '-=15px' }, 500);
    });


    $(".category li").click(function() {
        var category = $(this).attr('class');

        $('.category li').removeClass('active');
        $(this).addClass('active');

        switch (category) {
            case 'html':
                $('.work a img').removeClass('selected');
                $('.work a.html img').addClass('selected');
                break;
            case 'js':
                $('.work a img').removeClass('selected');
                $('.work a.js img').addClass('selected');
                break;
            case 'all':
                $('.work a img').removeClass('selected');
                break;
        };
    });

    $(".work div.col-sm-3").click(function() {
        $(this).prev(".modal").dialog({
            modal: true,
            buttons: {
                OK: function() {
                    $(this).dialog("close");
                }
            }
        });
    });
};

$(document).ready(main);
