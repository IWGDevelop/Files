//Version 16
var textComplete = '1';
var onlyCode = 'Code';
var onlyDescription = 'Description';
var onlyName = 'Name';
/**
 * @deprecated Este método está en deshuso todos los DropDown se están migrando a la libraría Bootstrap-select. Usar solo getJsonForBootstrapSelect.
 */
function getJsonForDropDrown(url, dropDown, textType, extraOption) {
    var _this = this;
    on();
    $.getJSON(url)
        .done(function (data) {
        dropDown.removeAttr('disabled');
        dropDown.empty();
        dropDown.append('<option value="">Seleccione</option>');
        $.each(data, function (key, val) {
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
        .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error + ', ' + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
        _this.objCommon.showNotification('ERROR', 'Respuesta fallida <br> Servicio: ' + url + '<br>' + err, 'Web API');
        off();
    });
}
function getJsonForBootstrapSelect(url, options) {
    var _this = this;
    var dropDowns = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        dropDowns[_i - 2] = arguments[_i];
    }
    options = (setDefaults(options, defaultsBootstrapSelect));
    on();
    var extraText = '';
    $.ajax({
        dataType: 'json',
        url: url,
        async: options.async
    })
        .done(function (data) {
        var _loop_1 = function (dropDown) {
            if (options.enable) {
                dropDown.removeAttr('disabled');
            }
            dropDown.empty();
            $.each(data, function (key, val) {
                extraText = '';
                if (options.extraOption != null && options.extraOption != undefined && options.extraOption !== '') {
                    extraText += ' data-' + options.extraOption + '="' + val[options.extraOption] + '"';
                }
                if (options.extraOption2 != null && options.extraOption2 != undefined && options.extraOption2 !== '') {
                    extraText += ' data-' + options.extraOption2 + '="' + val[options.extraOption2] + '"';
                }
                if (options.subTextOption != null && options.subTextOption != undefined && options.subTextOption !== '') {
                    var opts = options.subTextOption.split('.');
                    var obj = val;
                    for (var i = 0; i < opts.length; i++) {
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
            if (options.urlValues != undefined && options.urlValues != null && options.urlValues != '') {
                $.ajax({
                    url: options.urlValues,
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        var array = [];
                        if (data != null) {
                            var theObject = JSON.parse(data);
                            for (var i = 0; i < theObject.length; i++) {
                                array.push(theObject[i]['Id']);
                            }
                        }
                        dropDown.selectpicker('val', array);
                    },
                    error: function (a, b, c) {
                        alert('Error');
                    }
                });
            }
            else {
                if (options.value != null && options.value != undefined && options.value != 0 && options.value != '') {
                    dropDown.selectpicker('val', options.value);
                }
            }
            dropDown.selectpicker('refresh');
            off();
        };
        for (var _i = 0, dropDowns_1 = dropDowns; _i < dropDowns_1.length; _i++) {
            var dropDown = dropDowns_1[_i];
            _loop_1(dropDown);
        }
    })
        .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error + ', ' + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
        _this.objCommon.showNotification('ERROR', 'Respuesta fallida <br> Servicio: ' + url + '<br>' + err, 'Web API');
        off();
    });
}
/**
 * @deprecated Este método está en deshuso ya que los componentes de Kendo están en deshuso. Usar solo getJsonForBootstrapSelect
 */
function getJsonForMultiselect(url) {
    var _this = this;
    var multiselect = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        multiselect[_i - 1] = arguments[_i];
    }
    on();
    $.getJSON(url)
        .done(function (data) {
        var listData = [];
        $.each(data, function (key, val) {
            listData.push(val);
        });
        for (var i = 0; i < multiselect.length; i++) {
            multiselect[i].data('kendoMultiSelect').setDataSource(new kendo.data.DataSource({ data: listData }));
        }
        off();
    })
        .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error + ', ' + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
        _this.objCommon.showNotification('ERROR', 'Respuesta fallida <br> Servicio: ' + url + '<br>' + err, 'Web API');
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
    var _this = this;
    on();
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
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
        error: function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error + ', ' + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
            _this.objCommon.showNotification('ERROR', 'Respuesta fallida <br> Servicio: ' + url + '<br>' + err, 'Web API');
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
        success: function (response) {
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
function getJson(url, data, evtDone) {
    on();
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (response, status, jqXHR) {
            evtDone(response, status, jqXHR);
            off();
        },
        error: function (jqXHR, status, error) {
            swal('Error', 'No se pudo obtener respuesta satisfactoria debido al error: ' + error, 'error');
            off();
        }
    });
}
function getCurrentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var tDay = day.toString();
    var tMonth = month.toString();
    if (day < 10) {
        tDay = '0' + day;
    }
    if (month < 10) {
        tMonth = '0' + month;
    }
    return year + '-' + tMonth + '-' + tDay;
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
        success: (function (data) {
            field.val(data);
            off();
            options.successEvent(data);
        }),
        error: (function (jqXHR, textStatus, error) {
            swal('Error', 'No hemos logrado conseguir un consecutivo para este documento.\n\nPor favor, inténtalo de nuevo en un momento y si el problema persiste contacta con el administrador', 'error');
            off();
        })
    });
}
function getTextSelectedFields(dropDown, attribute) {
    var fields = '';
    dropDown.find('option:selected').each(function () {
        fields += ',' + $(this).text();
        if (attribute != undefined && $(this).attr(attribute) != undefined) {
            fields += '|' + $(this).attr(attribute);
        }
    });
    if (fields != '') {
        fields = fields.substr(1);
    }
    return fields;
}
