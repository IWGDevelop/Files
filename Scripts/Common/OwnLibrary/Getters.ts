//Version 25

const textComplete: string = '1';
const onlyCode: string = 'Code';
const onlyDescription: string = 'Description';
const onlyName: string = 'Name';

function getJsonForBootstrapSelect(url: string, options: OptionsBootstrapSelect, ...dropDowns: JQuery[]) {
    options = <OptionsBootstrapSelect>(setDefaults(options, defaultsBootstrapSelect));
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
            $.each(data,
                (key, val) => {
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
                        let obj: string = val;
                        for (let i = 0; i < opts.length; i++) {
                            obj = obj[opts[i]];
                        }
                        if (options.limitSubTextOption > 0) {
                            if (obj.length < options.limitSubTextOption) {
                                extraText += ' data-subtext="' + obj + '"';
                            } else {
                                extraText += ' data-subtext="' + obj.substr(0, options.limitSubTextOption) + '..."';
                            }
                        } else {
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
                    success: (data2: string) => {
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
            } else {
                if (options.value != null &&
                    options.value != undefined &&
                    options.value !== 0 &&
                    options.value !== '') {
                    dropDown.selectpicker('val', options.value);
                } else {
                    if (data.length === 1 && options.autoSelect) {
                        if (dropDown.selectpicker()[0].length === 2) {
                            dropDown.selectpicker()[0].selectedIndex = 1;

                        } else {
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


function getCode(url: string, editor: JQuery) {
    getProperty(url, editor, 'Code');
}

function getDescription(url: string, editor: JQuery) {
    getProperty(url, editor, 'Description');
}

function getProperty(url: string, editor: JQuery, property?: string) {
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
                } else {
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

/**
 * @deprecated Usar el método getJson para evitar un llamado síncrono. El método getJson no retorna nada, en vez de eso recibe una función que se ejecuta cuando hay una respuesta satisfatoria y en este métdo debe escribirse lo que se ha de hacer con el objeto
 */
function getObject(url: string, data?: any): Object {
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
                } else {
                    object = response;
                }
            } else {
                object = null;
            }
        }
    });

    return object;
}

function getJson(url: string, data?: any, evtDone?: Function, errorMessage?: string) {
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
            } else {
                swal('Error', errorMessage, 'error');
            }
            off();
        }
    });
}

function getCurrentDate(withTime: boolean = false): string {
    return getFormatedDate(new Date(), withTime);
}

function getFormatedDate(date: Date, withTime?: boolean): string {
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
    } else {
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
function getConsecutive(field: JQuery, options: OptionsConsecutive) {
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
            swal('Error',
                'No hemos logrado conseguir un consecutivo para este documento.\n\nPor favor, inténtalo de nuevo en un momento y si el problema persiste contacta con el administrador',
                'error');
            off();
        })
    });
}

function getTextSelectedFields(dropDown: JQuery, attribute?: string) {
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