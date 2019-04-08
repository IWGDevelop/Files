// Version 3
const apiTransverse = localStorage.getItem("apiTransverse");
const urlTransverse = localStorage.getItem("urlTransverse");
const apiGroup = localStorage.getItem("apiGroup");
const apiFreight = localStorage.getItem("apiFreight");
const localApiTransverse = localStorage.getItem("localApiTransverse");
const localUrlTransverse = localStorage.getItem("localUrlTransverse");
const localApiGroup = localStorage.getItem("localApiGroup");
const localApiFreight = localStorage.getItem("localApiFreight");
const rootPath = localStorage.getItem("rootPath");
var onQuantity = 0;
var CommonModule;
(function (CommonModule) {
    class CommonMessage {
        constructor(fieldId, outputId, validationId) {
            this.field = $('#' + fieldId);
            this.output = $('#' + outputId);
            this.validation = $('#' + validationId);
            this.messageError = $("#messageErrorH");
            this.typeError = $("#typeErrorH");
            this.titleError = $("#titleErrorH");
            const self = this;
            this.validation.click(event => {
                if (this.field.val() == "") {
                    this.output.html("El campo no puede estar vacío.");
                }
                else {
                    this.output.html("");
                }
            });
            this.field.focusout(event => {
                if (this.field.val() == "") {
                    this.output.html("El campo no puede estar vacío. ");
                    event.preventDefault();
                }
                else {
                    this.output.html("");
                }
            });
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": 300,
                "hideDuration": 2000,
                "timeOut": 7000,
                "extendedTimeOut": 1000,
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            if (this.messageError.val() != '' && this.messageError.val() != undefined) {
                this.showNotification(this.typeError.val(), this.messageError.val(), this.titleError.val());
            }
        }
        showNotification(type, message, title) {
            switch (type) {
                case "OK":
                    toastr.success(message, title);
                    break;
                case "INFO":
                    toastr.info(message, title);
                    break;
                case "WARNING":
                    toastr.warning(message, title);
                    break;
                case "ERROR":
                    toastr.error(message, title);
                    break;
                default:
                    toastr.info(message, title);
                    break;
            }
        }
        //Método de consulta Origenes y destinos con ventana modal
        //title: Titulo de la ventana //param: Tipo de consulta (Puertos o Ciudades)
        //output: 
        //        
        modalOrigDest(title, param, output, output2, partialView) {
            let err = "errores: ";
            bootbox.confirm({
                title: "Filtro " + title + " " + param,
                message: "<div class='contentAlert'></div>",
                callback: function (result) {
                    if (result) {
                        const dataD = $("#" + output).data("kendoMultiSelect").dataItems();
                        if (output == "CityId") {
                            for (let item of dataD) {
                                item.DescriptionPort = item.CityName;
                            }
                        }
                        output2.data("kendoMultiSelect").setDataSource(dataD);
                        output2.data("kendoMultiSelect").value($("#" + output).data("kendoMultiSelect").value());
                    }
                    else {
                        objCommon.showNotification("INFO", "No se seleccionaron valores", "View Modal");
                    }
                }
            });
            $(".contentAlert").load("../Common/" + partialView, function (response, status, xhr) {
                //let form = $("#trafficForm");
                //form.data('validator', null);
                //$.validator.unobtrusive.parse(form);
                if (status == "error") {
                    //alert("Error al cargar data");
                    err += xhr.statusText;
                    objCommon.showNotification("ERROR", "Respuesta fallida: <br> Servicio: " + err, "View Modal" + title);
                }
            });
        }
    }
    CommonModule.CommonMessage = CommonMessage;
})(CommonModule || (CommonModule = {}));
var objCommon = new CommonModule.CommonMessage();
