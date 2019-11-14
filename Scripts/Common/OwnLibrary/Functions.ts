//Version 11

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

function saveObject(url: string, object, callback?) {
    on();
    $.ajax({
        type: 'POST',
        url: url,
        data: object,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: (response) => {
            if (callback !== undefined) {
                callback(response);
            } else {
                swal(
                    'Guardado',
                    'El objeto se ha guardado correctamente',
                    'success'
                );
            }
            off();
        },
        error: (xhr, status, error) => {
            off();
            swal(
                'Error',
                'No hemos podido guardar el objeto.\n\nError: ' + error,
                'error'
            );
        },
    });
}

function enableFields(...fields: JQuery[]) {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].attr('type') === 'checkbox') {
            fields[i].bootstrapSwitch('disabled', false);
        } else {
            if (fields[i].data('kendoDatePicker') != undefined) {
                fields[i].data('kendoDatePicker').enable(true);
            } else {
                fields[i].removeAttr('disabled');
            }
        }
    }
    $('.selectpicker').selectpicker('refresh');
}

function disableFields(...fields: JQuery[]) {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].attr('type') === 'checkbox') {
            fields[i].bootstrapSwitch('disabled', true);
        } else {
            if (fields[i].data('kendoDatePicker') != undefined) {
                fields[i].data('kendoDatePicker').enable(false);
            } else {
                fields[i].attr('disabled', 'true');
            }
        }
    }
    $('.selectpicker').selectpicker('refresh');
}

function generateModal(options: OptionsModal) {
    on();
    options = ((setDefaults(options, defaultsModal)) as OptionsModal);
    let modal = M.Modal.init(document.querySelectorAll('.modal'), { inDuration: 300, dismissible: true, onCloseEnd: options.closeCallback })[0];
    $('#divModalContent')
        .html('<h4>' + options.title + '</h4><hr\><div id="divModalBody"></div>');
    let body = $('#divModalBody');

    switch (options.type) {
        case 'partialView':
            body.load(options.loadUrl, options.loadData, (response, status, xhr) => {
                if (status === 'success') {
                    modal.open();

                    if (options.loadCallback != undefined) {
                        options.loadCallback(response);
                    }
                } else {
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

//Función para convertir los datos de un formulario a un objeto
function objectifyForm(form: JQuery): Object {
    const returnArray = {};
    const array = form.serializeArray();
    for (let i = 0; i < array.length; i++) {
        returnArray[array[i]['name']] = array[i]['value'];
    }
    return returnArray;
}

function calculateDv(nit: string) {
    if (nit !== '') {
        let tmp: string;
        let check: number = 0;
        const weights: number[] = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

        for (let i = 0; i < nit.length; i++) {
            tmp = nit.substring(nit.length - (i + 1), nit.length - i);
            check += (+tmp * weights[i]);
        }

        const mod = check % 11;
        if (mod === 0 || mod === 1) {
            return mod.toString();
        }

        return (11 - mod).toString();
    } else {
        return '';
    }
}