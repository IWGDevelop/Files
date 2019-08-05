// Version 4
const apiTransverse = localStorage.getItem('apiTransverse');
const urlTransverse = localStorage.getItem('urlTransverse');
const apiGroup = localStorage.getItem('apiGroup');
const apiFreight = localStorage.getItem('apiFreight');
const localApiTransverse = localStorage.getItem('localApiTransverse');
const localUrlTransverse = localStorage.getItem('localUrlTransverse');
const localApiGroup = localStorage.getItem('localApiGroup');
const localApiFreight = localStorage.getItem('localApiFreight');
const rootPath = localStorage.getItem('rootPath');
let onQuantity = 0;
var CommonModule;
(function (CommonModule) {
    class CommonMessage {
        constructor(fieldId, outputId, validationId) {
            this.showNotification = (type, message, title) => {
                switch (type) {
                    case 'OK':
                        M.toast({ html: title + ': ' + message });
                        break;
                    case 'INFO':
                        M.toast({ html: title + ': ' + message });
                        break;
                    case 'WARNING':
                        M.toast({ html: title + ': ' + message });
                        break;
                    case 'ERROR':
                        M.toast({ html: title + ': ' + message });
                        break;
                    default:
                        M.toast({ html: title + ': ' + message });
                        break;
                }
            };
            this.field = $('#' + fieldId);
            this.output = $('#' + outputId);
            this.validation = $('#' + validationId);
            this.messageError = $('#messageErrorH');
            this.typeError = $('#typeErrorH');
            this.titleError = $('#titleErrorH');
            this.validation.click(event => {
                if (this.field.val() == '') {
                    this.output.html('El campo no puede estar vacío.');
                }
                else {
                    this.output.html('');
                }
            });
            this.field.focusout(event => {
                if (this.field.val() == '') {
                    this.output.html('El campo no puede estar vacío. ');
                    event.preventDefault();
                }
                else {
                    this.output.html('');
                }
            });
            if (this.messageError.val() != '' && this.messageError.val() != undefined) {
                this.showNotification(this.typeError.val().toString(), this.messageError.val().toString(), this.titleError.val().toString());
            }
        }
    }
    CommonModule.CommonMessage = CommonMessage;
})(CommonModule || (CommonModule = {}));
const objCommon = new CommonModule.CommonMessage();
