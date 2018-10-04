//Version 4
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
        data: JSON.stringify(object),
        contentType: 'application/json; charset=utf-8',
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
    var dialog;
    switch (options.type) {
        case 'alert':
            dialog = bootbox.alert({
                title: options.title,
                message: "<div id='bootboxWindow' style='display:none;'></div>",
                callback: options.bootboxCallback,
                size: 'large',
                className: className
            });
            break;
        case 'confirm':
            dialog = bootbox.confirm({
                title: options.title,
                message: "<div id='bootboxWindow' style='display:none;'></div>",
                callback: options.bootboxCallback,
                size: 'large',
                className: className
            });
            break;
        case 'dialog':
            dialog = bootbox.dialog({
                title: options.title,
                message: "<div id='bootboxWindow' style='display:none;'></div>",
                callback: options.bootboxCallback,
                size: 'large',
                className: className
            });
            break;
    }
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
//Función para convertir los datos de un formulario a un objeto
function objectifyForm(form) {
    var returnArray = {};
    var array = form.serializeArray();
    for (var i = 0; i < array.length; i++) {
        returnArray[array[i]['name']] = array[i]['value'];
    }
    return returnArray;
}
//Función para agregar una animación a un objeto SVG
function animationSVG() {
    var arrow = $(this).find('#arrow');
    if (arrow.hasClass("play")) {
        arrow.addClass("reverse");
        arrow.removeClass("play");
    }
    else {
        arrow.addClass("play");
        arrow.removeClass("reverse");
    }
}
function calculateDV(nit) {
    if (nit != "") {
        var i = void 0;
        var tmp = void 0;
        var check = 0;
        var mod = void 0;
        var weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
        for (i = 0; i < nit.length; i++) {
            tmp = nit.substring(nit.length - (i + 1), nit.length - i);
            check += (tmp * weights[i]);
        }
        mod = check % 11;
        if (mod == 0 || mod == 1) {
            return mod.toString();
        }
        return (11 - mod).toString();
    }
    else {
        return "";
    }
}
