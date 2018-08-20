const textComplete: string = "1";
const onlyCode: string = "Code";
const onlyDescription: string = "Description";
const onlyName: string = "Name";

function getJsonForDropDrown(url: string, dropDown: JQuery, textType: string, extraOption: string) {
    on();
    $.getJSON(url)
        .done(data => {
            dropDown.removeAttr("disabled");
            dropDown.empty();
            dropDown.append('<option value="">Seleccione</option>');
            $.each(data, (key, val) => {
                switch (textType) {
                    case textComplete:
                        if (extraOption === "") {
                            dropDown.append('<option value="' + val.Id + '">' + val.Code + " - " + val.Description + '</option>');
                        } else {
                            dropDown.append('<option value="' + val.Id + '" data-' + extraOption + '=' + val[extraOption] + '>' + val.Code + " - " + val.Description + '</option>');
                        }
                        break;
                    case onlyCode:
                        if (extraOption === "") {
                            dropDown.append('<option value="' + val.Id + '">' + val.Code + '</option>');
                        } else {
                            dropDown.append('<option value="' + val.Id + '" data-' + extraOption + '=' + val[extraOption] + '>' + val.Code + '</option>');
                        }
                        break;
                    case onlyDescription:
                        if (extraOption === "") {
                            dropDown.append('<option value="' + val.Id + '" data-cod="' + val.Code + '">' + val.Description + '</option>');
                        } else {
                            dropDown.append('<option value="' + val.Id + '" data-cod="' + val.Code + '" data-' + extraOption + '=' + val[extraOption] + '>' + val.Description + '</option>');
                        }
                        break;
                    default:
                        if (extraOption === "") {
                            dropDown.append('<option value="' + val.Id + '" data-cod="' + val.Code + '">' + val[textType] + '</option>');
                        } else {
                            dropDown.append('<option value="' + val.Id + '" data-cod="' + val.Code + '" data-' + extraOption + '=' + val[extraOption] + '>' + val[textType] + '</option>');
                        }
                        break;
                }
            });
            off();
        })
        .fail((jqxhr, textStatus, error) => {
            let err = textStatus + ", " + error + ", " + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
            this.objCommon.showNotification("ERROR", "Respuesta fallida <br> Servicio: " + url + "<br>" + err, "Web API");
            off();
        });
}

function getJsonForBootstrapSelect(url: string, options: OptionsBootstrapSelect, ...dropDowns: JQuery[]) {
    options = setDefaults(options, defaultsBootstrapSelect);
    on();
    var extraText = "";
    $.getJSON(url)
        .done(data => {
            for (let dropDown of dropDowns) {
                if (options.enable) {
                    dropDown.removeAttr("disabled");
                }
                dropDown.empty();
                $.each(data, (key, val) => {
                    extraText = "";
                    if (options.extraOption != "" && options.extraOption != undefined && options.extraOption != null) {
                        extraText += ' data-' + options.extraOption + '=' + val[options.extraOption];
                    }
                    if (options.subTextOption != "" && options.subTextOption != undefined && options.subTextOption != null) {
                        var opts = options.subTextOption.split('.');
                        let obj: string = val;
                        for (var i = 0; i < opts.length; i++) {
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
                    dropDown.append('<option value="' + val.Id + '"' + extraText + '>' + val[options.text] + '</option>');
                });
                dropDown.selectpicker('refresh');
                off();
            }
        })
        .fail((jqxhr, textStatus, error) => {
            let err = textStatus + ", " + error + ", " + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
            this.objCommon.showNotification("ERROR", "Respuesta fallida <br> Servicio: " + url + "<br>" + err, "Web API");
            off();
        });
}

function getJsonForMultiselect(url: string, ...multiselect: JQuery[]) {
    on();
    $.getJSON(url)
        .done(data => {
            let listData = [];
            $.each(data, (key, val) => {
                listData.push(val);
            });
            for (var i = 0; i < multiselect.length; i++) {
                multiselect[i].data("kendoMultiSelect").setDataSource(new kendo.data.DataSource({ data: listData }));
            }
            off();
        })
        .fail((jqxhr, textStatus, error) => {
            let err = textStatus + ", " + error + ", " + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
            this.objCommon.showNotification("ERROR", "Respuesta fallida <br> Servicio: " + url + "<br>" + err, "Web API");
            off();
        });
}

function getCode(url: string, editor: JQuery) {
    getProperty(url, editor, "Code");
}

function getDescription(url: string, editor: JQuery) {
    getProperty(url, editor, "Description");
}

function getProperty(url: string, editor: JQuery, property: string) {
    on();
    $.getJSON(url)
        .done(data => {
            if (data != null) {
                editor.val(data[property]);
            }
            off();
        })
        .fail((jqxhr, textStatus, error) => {
            let err = textStatus + ", " + error + ", " + jqxhr.responseJSON != null ? '' : jqxhr.responseJSON.MessageDetail;
            this.objCommon.showNotification("ERROR", "Respuesta fallida <br> Servicio: " + url + "<br>" + err, "Web API");

            off();
        });
}

function getObject(url: string, params?: any): Object {
    var object;

    $.ajax({
        url: url,
        data: params,
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data != null) {
                if (data.length == 1) {
                    object = data[0];
                } else {
                    object = data;
                }
            } else {
                object = null;
            }
        }
    });

    return object;
}

function getCurrentDate(): string {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var tDay = day.toString();
    var tMonth = month.toString();

    if (day < 10) {
        tDay = '0' + day
    }

    if (month < 10) {
        tMonth = '0' + month
    }

    return year + "-" + tMonth + "-" + tDay;
}

//Función para generar un consecutivo usando el servicio publicado de generación de consecutivos para un documento específico
function getConsecutive(field: JQuery, idDocumentId, businessUnitId, serviceTypeId, companyId, saveOp: boolean) {
    on();
    $.ajax({
        url: apiTransverse + "DocumentTypes/GetConsecutive",
        dataType: 'json',
        data: {
            idDocument: idDocumentId,
            businessUnit: businessUnitId,
            serviceType: serviceTypeId,
            company: companyId,
            save: saveOp
        },
        success: (data => {
            field.val(data);
            off();
        }),
        error: ((jqXHR, textStatus, error) => {
            swal("Error", "No hemos logrado conseguir un consecutivo para este documento.\n\nPor favor, inténtalo de nuevo en un momento y si el problema persiste contacta con el administrador", "error");
            off();
        })
    });
}

function getTextSelectedFields(dropDown: JQuery, attribute?: string) {
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