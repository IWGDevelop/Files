$(document).ready(function () {
    var overlay = $(".sidebar-overlay");

    $('.ic_menu').on('click', function () {
        var sidebar = $('#sidebar');
        sidebar.toggleClass('open');
        if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')) {
            overlay.addClass('active');
        } else {
            overlay.removeClass('active');
        }
    });

    overlay.on('click', function () {
        $(this).removeClass('active');
        $('#sidebar').removeClass('open');
    });
});

$(document).ready(function () {
    var sidebar = $('#sidebar');
    var sidebarHeader = $('#sidebar .sidebar-header');
    var sidebarImg = sidebarHeader.css('background-image');
    var toggleButtons = $('.ic_menu');

    sidebar.addClass("sidebar-fixed-left");
    sidebar.addClass("sidebar-colored");
});

(function ($) {
    var dropdown = $(".dropdown");
    var dropdownSecond = $(".dropdown-second");
    var isCollapsed = true;
    var isCollapsedSecond = true;
    var clickOnSecond = false;
    var lastOpened = "";

    // Add slidedown animation to dropdown
    dropdown.on("click", function (e) {
        //Si es el mismo que abrí
        if ($(this)[0].id == lastOpened) {
            //Cierrelo
            $(this)
                  .find(".dropdown-menu")
                  .first()
                  .stop(true, true)
                  .slideUp();
        } else {
            $(".dropdown-menu").first()
                  .stop(true, true)
                  .slideUp();
            if (isCollapsed) {
                $(this)
                  .find(".dropdown-menu")
                  .first()
                  .stop(true, true)
                  .slideDown();
                lastOpened = $(this)[0].id;
            } else {
                if (!clickOnSecond) {
                    $(this)
                      .find(".dropdown-menu")
                      .first()
                      .stop(true, true)
                      .slideUp();
                    lastOpened = "";
                }
            }
        }
    });

    dropdownSecond.on("click", function (e) {
        if (isCollapsedSecond) {
            $(this)
              .find(".dropdown-menu-second")
              .first()
              .stop(true, true)
              .slideDown();
            isCollapsedSecond = !isCollapsedSecond;
            clickOnSecond = true;
        } else {
            $(this)
              .find(".dropdown-menu-second")
              .first()
              .stop(true, true)
              .slideUp();
            isCollapsedSecond = !isCollapsedSecond;
        }
    });
})(jQuery);

(function (removeClass) {
    jQuery.fn.removeClass = function (value) {
        if (value && typeof value.test === "function") {
            for (var i = 0, l = this.length; i < l; i++) {
                var elem = this[i];
                if (elem.nodeType === 1 && elem.className) {
                    var classNames = elem.className.split(/\s+/);

                    for (var n = classNames.length; n--;) {
                        if (value.test(classNames[n])) {
                            classNames.splice(n, 1);
                        }
                    }
                    elem.className = jQuery.trim(classNames.join(" "));
                }
            }
        } else {
            removeClass.call(this, value);
        }
        return this;
    };
})(jQuery.fn.removeClass);


$('.tree-toggle').click(function () {
    $(this).parent().children('ul.tree').toggle(200);
});