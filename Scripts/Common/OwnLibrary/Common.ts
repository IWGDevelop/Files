// Version 3

const apiTransverse: string = localStorage.getItem("apiTransverse");
const urlTransverse: string = localStorage.getItem("urlTransverse");
const apiGroup: string = localStorage.getItem("apiGroup");
const apiFreight: string = localStorage.getItem("apiFreight");
const localApiTransverse: string = localStorage.getItem("localApiTransverse");
const localUrlTransverse: string = localStorage.getItem("localUrlTransverse");
const localApiGroup: string = localStorage.getItem("localApiGroup");
const localApiFreight: string = localStorage.getItem("localApiFreight");
const rootPath: string = localStorage.getItem("rootPath");

var onQuantity: number = 0;

module CommonModule {

    export class CommonMessage {
        private field: JQuery;
        private output: JQuery;
        private validation: JQuery;
        private typeError: JQuery;
        private messageError: JQuery;
        private titleError: JQuery;

        constructor(fieldId?: string, outputId?: string, validationId?: string) {
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

                } else {
                    this.output.html("");
                }
            });
            this.field.focusout(event => {
                if (this.field.val() == "") {
                    this.output.html("El campo no puede estar vacío. ");
                    event.preventDefault();
                } else {
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

        public showNotification(type: string, message: string, title: string) {
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
        public modalOrigDest(title, param, output, output2: JQuery, partialView) {
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
}

var objCommon: CommonModule.CommonMessage = new CommonModule.CommonMessage();
