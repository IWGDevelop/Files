var apiTransverse = localStorage.getItem("apiTransverse");
var urlTransverse = localStorage.getItem("urlTransverse");
var apiGroup = localStorage.getItem("apiGroup");
var apiFreight = localStorage.getItem("apiFreight");
var localApiTransverse = localStorage.getItem("localApiTransverse");
var localUrlTransverse = localStorage.getItem("localUrlTransverse");
var localApiGroup = localStorage.getItem("localApiGroup");
var localApiFreight = localStorage.getItem("localApiFreight");
var rootPath = localStorage.getItem("rootPath");
var onQuantity = 0;
var CommonModule;
(function (CommonModule) {
    var CommonMessage = /** @class */ (function () {
        function CommonMessage(fieldId, outputId, validationId) {
            var _this = this;
            this.field = $('#' + fieldId);
            this.output = $('#' + outputId);
            this.validation = $('#' + validationId);
            this.messageError = $("#messageErrorH");
            this.typeError = $("#typeErrorH");
            this.titleError = $("#titleErrorH");
            var self = this;
            this.validation.click(function (event) {
                if (_this.field.val() == "") {
                    _this.output.html("El campo no puede estar vacío.");
                }
                else {
                    _this.output.html("");
                }
            });
            this.field.focusout(function (event) {
                if (_this.field.val() == "") {
                    _this.output.html("El campo no puede estar vacío. ");
                    event.preventDefault();
                }
                else {
                    _this.output.html("");
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
        CommonMessage.prototype.showNotification = function (type, message, title) {
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
        };
        //Método de consulta Origenes y destinos con ventana modal
        //title: Titulo de la ventana //param: Tipo de consulta (Puertos o Ciudades)
        //output: 
        //        
        CommonMessage.prototype.ModalOrigDest = function (title, param, output, output2, partialView) {
            var err = "errores: ";
            bootbox.confirm({
                title: "Filtro " + title + " " + param,
                message: "<div class='contentAlert'></div>",
                callback: function (result) {
                    if (result) {
                        var dataD = $("#" + output).data("kendoMultiSelect").dataItems();
                        if (output == "CityId") {
                            for (var _i = 0, dataD_1 = dataD; _i < dataD_1.length; _i++) {
                                var item = dataD_1[_i];
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
        };
        return CommonMessage;
    }());
    CommonModule.CommonMessage = CommonMessage;
})(CommonModule || (CommonModule = {}));
var objCommon = new CommonModule.CommonMessage();
