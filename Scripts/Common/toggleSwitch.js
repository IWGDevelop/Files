/**
 * Created by SagarKhatri on 18-Aug-15.
 */
(function ($) {

    $.fn.toggleSwitch = function () {
        for (var i = 0; i < this.length; i++) {
            var id = this[i].id;
            if (id != null && id != "") {
                var switchDivId = id + "-switch";
                $("<div/>", { class: "onoffswitch", id: switchDivId }).insertAfter($("#" + this[i].id));
                $("div#" + switchDivId).append($("#" + this[i].id).clone().addClass('onoffswitch-checkbox'));
                $("<label/>", {
                    class: "onoffswitch-label",
                    for: id
                }).appendTo("div#" + switchDivId);
                $("#" + this[i].id).remove();
            } else {
                //this[i].toggleSwitchName();
            }
        }
    };

    $.fn.toggleSwitchName = function () {
        var name = this.attr("name"),
            switchDivId = name + "-switch";
        $("<div/>", { class: "onoffswitch", id: switchDivId, name: switchDivId }).insertAfter(this);
        $("div[name='" + switchDivId+"'").append(this.clone().addClass('onoffswitch-checkbox'));
        $("<label/>", {
            class: "onoffswitch-label",
            for: name
        }).appendTo("div[name='" + switchDivId + "'");
        this.remove();
    };
}(jQuery));
