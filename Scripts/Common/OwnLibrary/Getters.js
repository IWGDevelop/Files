//Version 18
const textComplete = '1';
const onlyCode = 'Code';
const onlyDescription = 'Description';
const onlyName = 'Name';
/**
 * @deprecated Este método está en deshuso todos los DropDown se están migrando a la libraría Bootstrap-select. Usar solo getJsonForBootstrapSelect.
 */
function getJsonForDropDrown(url, dropDown, textType, extraOption) {
    on();
    $.getJSON(url)
        .done(data => {
        dropDown.removeAttr('disabled');
        dropDown.empty();
        dropDown.append('<option value="">Seleccione</option>');
        $.each(data, (key, val) => {
            switch (textType) {
                case textComplete:
                    if (extraOption === '') {
                        dropDown.append('<option value="' + val.Id + '">' + val.Code + ' - ' + val.Description + '</option>');
                    }
                    else {
                        dropDown.append('<option value="' + val.Id + '" data-' + extraOption + '=' + val[extraOption] + '>' + val.Code + ' - ' + val.Description + '</option>');
                    }
                    break;
                case onlyCode:
                    if (extraOption === '') {
                        dropDown.append('<option value="' + val.Id + '">' + val.Code + '</option>');
                    }
                    else {
                        dropDown.append('<option value="' + val.Id + '" data-' + extraOption + '=' + val[extraOption] + '>' + val.Code + '</option>');
                    }
                    break;
                case onlyDescription:
                    if (extraOption === '') {
                        dropDown.append('<option value="' + val.Id + ' data-cod="' + val.Code + '">' + val.Description + '</option>');
                    }
                    else {
                        dropDown.append('<option value="' + val.Id + ' data-cod="' + val.Code + '" data-' + extraOption + '=' + val[extraOption] + '>' + val.Description + '</option>');
                    }
                    break;
                default:
                    if (extraOption === '') {
                        dropDown.append('<option value="' + val.Id + '" data-cod="' + val.Code + '">' + val[textType] + '</option>');
                    }
                    else {
                        dropDown.append('<option value="' + val.Id + '" data-cod="' + val.Code + '" data-' + extraOption + '=' + val[extraOption] + '>' + val[textType] + '</option>');
                    }
                    break;
            }
        });
        off();
    })
        .fail((jqxhr, textStatus, error) => {
        const err = textStatus + ', ' + error + ', ' + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
        this.objCommon.showNotification('ERROR', 'Respuesta fallida <br> Servicio: ' + url + '<br>' + err, 'Web API');
        off();
    });
}
function getJsonForBootstrapSelect(url, options, ...dropDowns) {
    options = (setDefaults(options, defaultsBootstrapSelect));
    on();
    var extraText = '';
    $.ajax({
        dataType: 'json',
        url: url,
        async: options.async
    })
        .done(data => {
        for (let dropDown of dropDowns) {
            if (options.enable) {
                dropDown.removeAttr('disabled');
            }
            dropDown.empty();
            $.each(data, (key, val) => {
                extraText = '';
                if (options.extraOption != null && options.extraOption != undefined && options.extraOption !== '') {
                    extraText += ' data-' + options.extraOption + '="' + val[options.extraOption] + '"';
                }
                if (options.extraOption2 != null && options.extraOption2 != undefined && options.extraOption2 !== '') {
                    extraText += ' data-' + options.extraOption2 + '="' + val[options.extraOption2] + '"';
                }
                if (options.subTextOption != null && options.subTextOption != undefined && options.subTextOption !== '') {
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
                if (val != null && val != undefined) {
                    dropDown.append('<option value="' + val.Id + '"' + extraText + '>' + val[options.text] + '</option>');
                }
            });
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
                if (options.value != null && options.value != undefined && options.value !== 0 && options.value !== '') {
                    dropDown.selectpicker('val', options.value);
                }
            }
            dropDown.selectpicker('refresh');
            off();
        }
    })
        .fail((jqxhr, textStatus, error) => {
        const err = jqxhr.responseJSON.MessageDetail;
        this.objCommon.showNotification('ERROR', 'Respuesta fallida <br> Servicio: ' + url + '<br>' + err, 'Web API');
        off();
    });
}
/**
 * @deprecated Este método está en deshuso ya que los componentes de Kendo están en deshuso. Usar solo getJsonForBootstrapSelect
 */
function getJsonForMultiselect(url, ...multiselect) {
    on();
    $.getJSON(url)
        .done(data => {
        const listData = [];
        $.each(data, (key, val) => {
            listData.push(val);
        });
        for (let i = 0; i < multiselect.length; i++) {
            multiselect[i].data('kendoMultiSelect').setDataSource(new kendo.data.DataSource({ data: listData }));
        }
        off();
    })
        .fail((jqxhr, textStatus, error) => {
        const err = jqxhr.responseJSON.MessageDetail;
        this.objCommon.showNotification('ERROR', 'Respuesta fallida <br> Servicio: ' + url + '<br>' + err, 'Web API');
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
                    editor.val(data[property]);
                }
                else {
                    editor.val(data);
                }
            }
            off();
        },
        error: (jqxhr, textStatus, error) => {
            const err = jqxhr.responseJSON.MessageDetail;
            this.objCommon.showNotification('ERROR', 'Respuesta fallida <br> Servicio: ' + url + '<br>' + err, 'Web API');
            off();
        }
    });
}
/**
 * @deprecated Usar el método getJson para evitar un llamado síncrono. El método getJson no retorna nada, en vez de eso recibe una función que se ejecuta cuando hay una respuesta satisfatoria y en este métdo debe escribirse lo que se ha de hacer con el objeto
 */
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
//Función para generar un consecutivo usando el servicio publicado de generación de consecutivos para un documento específico
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
