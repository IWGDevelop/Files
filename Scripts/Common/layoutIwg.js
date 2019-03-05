$(function () {
    var checkboxes = $(":checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        if (!$(checkboxes[i]).hasClass("treeview")) {
            $(checkboxes[i]).toggleSwitch();
        }
    }
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

$(function () {
    let completeUrl = window.location.host + window.location.pathname;
    let parts = completeUrl.split('/');

    let link = window.location.protocol + "//";
    $("#header-text").append('<i class="fas fa-home" style="padding:0px 4px 0px 0px"></i>');
    for (let part of parts) {
        link += '/' + part;

        $("#header-text").append("<a class='panel-header-text' href='" + link + "'>" + part + '</a>');
        if (part != parts[parts.length - 1]) {
            $("#header-text").append('<i class="fas fa-angle-double-right" style="padding:0px 4px 0px 4px"></i>');
        }
    }
});