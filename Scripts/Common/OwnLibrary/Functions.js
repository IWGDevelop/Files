function on() {
    document.getElementById('overlay').style.display = 'block';
    onQuantity++;
}
function off() {
    if (onQuantity > 0) {
        onQuantity--;
        if (onQuantity === 0) {
            document.getElementById('overlay').style.display = 'none';
        }
    }
}
function saveObject(url, object, callback) {
    on();
    $.ajax({
        type: 'POST',
        url: url,
        data: object,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            callback(response);
            off();
        },
        error: function (xhr, status, error) {
            off();
            swal('Error', 'No hemos podido guardar el objeto.\n\nError: ' + error, 'error');
        },
    });
}
function enableFields() {
    var fields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
    }
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].attr('type') === 'checkbox') {
            fields[i].bootstrapSwitch('disabled', false);
        }
        else {
            if (fields[i].data('kendoDatePicker') != undefined) {
                fields[i].data('kendoDatePicker').enable(true);
            }
            else {
                fields[i].removeAttr('disabled');
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
        if (fields[i].attr('type') === 'checkbox') {
            fields[i].bootstrapSwitch('disabled', true);
        }
        else {
            if (fields[i].data('kendoDatePicker') != undefined) {
                fields[i].data('kendoDatePicker').enable(false);
            }
            else {
                fields[i].attr('disabled', 'true');
            }
        }
    }
    $('.selectpicker').selectpicker('refresh');
}
function generateModal(options) {
    on();
    options = (setDefaults(options, defaultsModal));
    var modal = M.Modal.init(document.querySelectorAll('.modal'), { inDuration: 300, dismissible: true, onCloseEnd: options.closeCallback })[0];
    $('#divModalContent')
        .html('<h4>' + options.title + '</h4><hr\><div id="divModalBody"></div>');
    var body = $('#divModalBody');
    switch (options.type) {
        case 'partialView':
            body.load(options.loadUrl, options.loadData, function (response, status, xhr) {
                if (status === 'success') {
                    modal.open();
                    if (options.loadCallback != undefined) {
                        options.loadCallback(response);
                    }
                }
                else {
                    objCommon.showNotification('ERROR', 'Respuesta fallida: <br> Servicio: ' + xhr.statusText, 'View Modal');
                }
                off();
            });
            break;
        case 'grid':
            createBasicGrid($('#divModalBody'), options.gridOptions);
            modal.open();
            off();
            break;
        case 'localgrid':
            modal.open();
            createBasicLocalGrid($('#divModalBody'), options.gridOptions, options.gridData);
            off();
            break;
        case 'html':
            body.html(options.html);
            modal.open();
            off();
            break;
    }
}
function objectifyForm(form) {
    var returnArray = {};
    var array = form.serializeArray();
    for (var i = 0; i < array.length; i++) {
        returnArray[array[i]['name']] = array[i]['value'];
    }
    return returnArray;
}
function calculateDv(nit) {
    if (nit !== '') {
        var tmp = void 0;
        var check = 0;
        var weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
        for (var i = 0; i < nit.length; i++) {
            tmp = nit.substring(nit.length - (i + 1), nit.length - i);
            check += (+tmp * weights[i]);
        }
        var mod = check % 11;
        if (mod === 0 || mod === 1) {
            return mod.toString();
        }
        return (11 - mod).toString();
    }
    else {
        return '';
    }
}
