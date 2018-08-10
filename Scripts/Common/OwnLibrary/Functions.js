function on() {
    document.getElementById("overlay").style.display = "block";
    onQuantity++;
}
function off() {
    if (onQuantity > 0) {
        onQuantity--;
        if (onQuantity == 0) {
            document.getElementById("overlay").style.display = "none";
        }
    }
}
function saveObject(url, object, callback) {
    on();
    $.ajax({
        type: "POST",
        url: url,
        data: object,
        dataType: "json",
        success: function (response) {
            callback(response);
            off();
        },
        error: function (xhr, status, error) {
            off();
            swal("Error", "No hemos podido guardar el objeto.\n\nError: " + error, "error");
        },
    });
}
function enableFields() {
    var fields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
    }
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].attr("type") == "checkbox") {
            fields[i].bootstrapSwitch("disabled", false);
        }
        else {
            if (fields[i].data('kendoDatePicker') != undefined) {
                fields[i].data('kendoDatePicker').enable(true);
            }
            else {
                fields[i].removeAttr("disabled");
            }
        }
    }
    $('.selectpicker').selectpicker('refresh');
}
function disableFields() {
    var fields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
    }
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].attr("type") == "checkbox") {
            fields[i].bootstrapSwitch('disabled', true);
        }
        else {
            if (fields[i].data('kendoDatePicker') != undefined) {
                fields[i].data('kendoDatePicker').enable(false);
            }
            else {
                fields[i].attr("disabled", "true");
            }
        }
    }
    $('.selectpicker').selectpicker('refresh');
}
function expandAccordion(id) {
    if ($("#" + id).hasClass("collapsed")) {
        $("#" + id).click();
    }
}
function collapseAccordion(id) {
    if (!$("#" + id).hasClass("collapsed")) {
        $("#" + id).click();
    }
}
function generateBootbox(options) {
    on();
    options = setDefaults(options, defaultsGenerateBootbox);
    var className = options.big ? 'IWG_Modal' : '';
    var dialog = bootbox.confirm({
        title: options.title,
        message: "<div id='bootboxWindow' style='display:none;'></div>",
        callback: options.bootboxCallback,
        size: 'large',
        className: className
    });
    dialog.init(function () {
        $("#bootboxWindow").load(options.loadUrl, options.loadData, function (response, status, xhr) {
            if (status == "success") {
                $("#bootboxWindow").show('fade');
                var h = '50%';
                $("#bootboxWindow").height(h);
                if (options.loadCallback != undefined) {
                    options.loadCallback(response);
                }
            }
            else {
                objCommon.showNotification("ERROR", "Respuesta fallida: <br> Servicio: " + xhr.statusText, "View Modal");
            }
            off();
        });
    });
}
//# sourceMappingURL=Functions.js.map