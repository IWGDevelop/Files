function validateDates(start: JQuery, end: JQuery) {
    if (start.data("kendoDatePicker") != undefined && end.data("kendoDatePicker") != undefined
        && start.data("kendoDatePicker").value().toString() != "" && end.data("kendoDatePicker").value().toString() != "") {
        if (end.data("kendoDatePicker").value() < start.data("kendoDatePicker").value()) {
            swal('Error',
                'La fecha inicial no puede ser mayor a la final',
                'warning');
            end.data("kendoDatePicker").value(start.data("kendoDatePicker").value());
        }
    }
}

function validateFields(...fields: JQuery[]): boolean {
    let op = true;
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].attr("disabled") == undefined && (fields[i].val() == null || fields[i].val() == "")) {
            objCommon.showNotification("WARNING", "Debe seleccionar " + fields[i].attr("name"), "Información");
            op = false;
        }
    }

    return op;
}