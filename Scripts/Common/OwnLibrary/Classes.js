function setDefaults(options, defaults) {
    return Object.assign({}, defaults, options);
}
var OptionsBootstrapSelect = (function () {
    function OptionsBootstrapSelect() {
    }
    return OptionsBootstrapSelect;
}());
var defaultsBootstrapSelect = {
    text: 'Description',
    extraOption: '',
    extraOption2: '',
    enable: false,
    subTextOption: '',
    limitSubTextOption: 0,
    showSubtext: false,
    value: 0,
    async: true,
    urlValues: '',
    autoSelect: true,
    callback: function () { }
};
var OptionsModal = (function () {
    function OptionsModal() {
    }
    return OptionsModal;
}());
var defaultsModal = {
    title: 'Modal',
    type: 'partialView',
    loadUrl: '',
    loadData: {},
    loadCallback: function (response) {
    },
    closeCallback: function (response) {
    },
    html: '',
    gridOptions: {}
};
var OptionsConsecutive = (function () {
    function OptionsConsecutive() {
    }
    return OptionsConsecutive;
}());
var defaultsConsecutive = {
    documentId: 0,
    businessUnitId: 0,
    serviceTypeId: 0,
    companyId: 1,
    saveOp: false,
    successEvent: function (data) {
    }
};
