const textComplete = '1';
const onlyCode = 'Code';
const onlyDescription = 'Description';
const onlyName = 'Name';
function getJsonForBootstrapSelect(url, options, ...dropDowns) {
    options = (setDefaults(options, defaultsBootstrapSelect));
    on();
    var extraText = '';
    $.ajax({
        dataType: 'json',
        url: url,
        async: options.async
    }).done(data => {
        for (let dropDown of dropDowns) {
            if (options.enable) {
                dropDown.removeAttr('disabled');
            }
            dropDown.empty();
            $.each(data, (key, val) => {
                extraText = '';
                if (options.extraOption != null &&
                    options.extraOption != undefined &&
                    options.extraOption !== '') {
                    extraText += ' data-' + options.extraOption + '="' + val[options.extraOption] + '"';
                }
                if (options.extraOption2 != null &&
                    options.extraOption2 != undefined &&
                    options.extraOption2 !== '') {
                    extraText += ' data-' + options.extraOption2 + '="' + val[options.extraOption2] + '"';
                }
                if (options.subTextOption != null &&
                    options.subTextOption != undefined &&
                    options.subTextOption !== '') {
                    const opts = options.subTextOption.split('.');
                    let obj = val;
                    for (let i = 0; i < opts.length; i++) {
                        obj = obj[opts[i]];
                    }
                    if (options.limitSubTextOption > 0) {
                        if (obj.length < options.limitSubTextOption) {
                            extraText += ' data-subtext="' + obj + '"';
                        }
                        else {
                            extraText += ' data-subtext="' + obj.substr(0, options.limitSubTextOption) + '..."';
                        }
                    }
                    else {
                        extraText += ' data-subtext="' + obj + '"';
                    }
                }
                if (val != null) {
                    dropDown.append('<option value="' +
                        val.Id +
                        '"' +
                        extraText +
                        '>' +
                        val[options.text] +
                        '</option>');
                }
            });
            dropDown.selectpicker('refresh');
            if (options.urlValues != undefined && options.urlValues != null && options.urlValues !== '') {
                $.ajax({
                    url: options.urlValues,
                    dataType: 'json',
                    async: false,
                    success: (data2) => {
                        const array = [];
                        if (data2 != null) {
                            const theObject = JSON.parse(data2);
                            for (let i = 0; i < theObject.length; i++) {
                                array.push(theObject[i]['Id']);
                            }
                        }
                        dropDown.selectpicker('val', array);
                    },
                    error: (a, b, c) => {
                        alert('Error');
                    }
                });
            }
            else {
                if (options.value != null &&
                    options.value != undefined &&
                    options.value !== 0 &&
                    options.value !== '') {
                    dropDown.selectpicker('val', options.value);
                }
                else {
                    if (data.length === 1 && options.autoSelect) {
                        if (dropDown.selectpicker()[0].length === 2) {
                            dropDown.selectpicker()[0].selectedIndex = 1;
                        }
                        else {
                            dropDown.selectpicker()[0].selectedIndex = 0;
                        }
                        dropDown.change();
                    }
                }
            }
            dropDown.selectpicker('refresh');
            off();
        }
        options.callback();
    })
        .fail((jqxhr, textStatus, error) => {
        swal('Error', 'Ha ocurrido unn error al obtener los datos del servicio ' + url + '. Comunícate con el administrador del sistema. [Función GetJsonForBootstrapSelect]', 'error');
        off();
    });
}
function getCode(url, editor) {
    getProperty(url, editor, 'Code');
}
function getDescription(url, editor) {
    getProperty(url, editor, 'Description');
}
function getProperty(url, editor, property) {
    on();
    $.ajax({
        url: url,
        dataType: 'json',
        success: data => {
            if (data != null) {
                if (property != undefined && property != null && property != '') {
                    let properties = property.split('.');
                    let value = data;
                    for (let prop of properties) {
                        value = value[prop];
                    }
                    editor.val(value);
                }
                else {
                    editor.val(data);
                }
            }
            off();
        },
        error: (jqxhr, textStatus, error) => {
            swal('Error', 'Ha ocurrido unn error al obtener los datos del servicio ' + url + '. Comunícate con el administrador del sistema. [Función GetProperty]', 'error');
            off();
        }
    });
}
function getObject(url, data) {
    var object;
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        async: false,
        success: (response) => {
            if (response != null) {
                if (response.length === 1) {
                    object = response[0];
                }
                else {
                    object = response;
                }
            }
            else {
                object = null;
            }
        }
    });
    return object;
}
function getJson(url, data, evtDone, errorMessage) {
    on();
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: 'GET',
        success: (response, status, jqXhr) => {
            evtDone(response, status, jqXhr);
            off();
        },
        error: (jqXhr, status, error) => {
            if (errorMessage === undefined || errorMessage === null || errorMessage === '') {
                swal('Error', 'No se pudo obtener respuesta satisfactoria debido al error: ' + error, 'error');
            }
            else {
                swal('Error', errorMessage, 'error');
            }
            off();
        }
    });
}
function getCurrentDate(withTime = false) {
    return getFormatedDate(new Date(), withTime);
}
function getFormatedDate(date, withTime) {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (date.getDate() < 10) {
        day = '0' + day;
    }
    if (date.getMonth() < 9) {
        month = '0' + month;
    }
    if (!withTime) {
        return year + '-' + month + '-' + day;
    }
    else {
        let hour = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        if (date.getHours() < 10) {
            hour = '0' + hour;
        }
        if (date.getMinutes() < 10) {
            minutes = '0' + minutes;
        }
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    }
}
function getConsecutive(field, options) {
    on();
    options = setDefaults(options, defaultsConsecutive);
    $.ajax({
        url: apiTransverse + 'DocumentTypes/GetConsecutive',
        dataType: 'json',
        data: {
            idDocument: options.documentId,
            businessUnit: options.businessUnitId,
            serviceType: options.serviceTypeId,
            company: options.companyId,
            save: options.saveOp
        },
        success: (data => {
            field.val(data);
            off();
            options.successEvent(data);
        }),
        error: ((jqXhr, textStatus, error) => {
            swal('Error', 'No hemos logrado conseguir un consecutivo para este documento.\n\nPor favor, inténtalo de nuevo en un momento y si el problema persiste contacta con el administrador', 'error');
            off();
        })
    });
}
function getTextSelectedFields(dropDown, attribute) {
    var fields = '';
    dropDown.find(':selected').each(function () {
        fields += ',' + $(this).text();
        if (attribute != undefined && $(this).attr(attribute) != undefined) {
            fields += '|' + $(this).attr(attribute);
        }
    });
    if (fields !== '') {
        fields = fields.substr(1);
    }
    return fields;
}
