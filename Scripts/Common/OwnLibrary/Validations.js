function validateDates(start, end, element) {
    if (start != undefined && end != undefined && start.toString() != "" && end.toString() != "") {
        if (start > end) {
            swal('Error', 'La fecha inicial no puede ser mayor a la final', 'warning');
            element.focus();
            return false;
        }
    }
}
function validateFields() {
    var fields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
    }
    var op = true;
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].attr("disabled") == undefined && (fields[i].val() == null || fields[i].val() == "")) {
            objCommon.showNotification("WARNING", "Debe seleccionar " + fields[i].attr("name"), "Información");
            op = false;
        }
    }
    return op;
}
