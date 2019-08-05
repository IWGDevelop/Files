// Version 4

const apiTransverse: string = localStorage.getItem('apiTransverse');
const urlTransverse: string = localStorage.getItem('urlTransverse');
const apiGroup: string = localStorage.getItem('apiGroup');
const apiFreight: string = localStorage.getItem('apiFreight');
const localApiTransverse: string = localStorage.getItem('localApiTransverse');
const localUrlTransverse: string = localStorage.getItem('localUrlTransverse');
const localApiGroup: string = localStorage.getItem('localApiGroup');
const localApiFreight: string = localStorage.getItem('localApiFreight');
const rootPath: string = localStorage.getItem('rootPath');

let onQuantity: number = 0;

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
            this.messageError = $('#messageErrorH');
            this.typeError = $('#typeErrorH');
            this.titleError = $('#titleErrorH');

            this.validation.click(event => {
                if (this.field.val() == '') {
                    this.output.html('El campo no puede estar vacío.');

                } else {
                    this.output.html('');
                }
            });
            this.field.focusout(event => {
                if (this.field.val() == '') {
                    this.output.html('El campo no puede estar vacío. ');
                    event.preventDefault();
                } else {
                    this.output.html('');
                }
            });

            if (this.messageError.val() != '' && this.messageError.val() != undefined) {
                this.showNotification(this.typeError.val().toString(), this.messageError.val().toString(), this.titleError.val().toString());
            }
        }

        public showNotification = (type: string, message: string, title: string) => {
            switch (type) {
                case 'OK':
                    M.toast({html: title + ': ' + message});
                    break;
                case 'INFO':
                    M.toast({html: title + ': ' + message});
                    break;
                case 'WARNING':
                    M.toast({html: title + ': ' + message});
                    break;
                case 'ERROR':
                    M.toast({html: title + ': ' + message});
                    break;
                default:
                    M.toast({html: title + ': ' + message});
                    break;
            }
        }
    }
}

const objCommon: CommonModule.CommonMessage = new CommonModule.CommonMessage();