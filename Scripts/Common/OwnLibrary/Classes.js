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
    urlValues: ''
};
var OptionsGenerateBootbox = (function () {
    function OptionsGenerateBootbox() {
    }
    return OptionsGenerateBootbox;
}());
var defaultsGenerateBootbox = {
    title: 'Bootbox',
    loadUrl: '',
    loadData: {},
    loadCallback: function (response) { },
    bootboxCallback: function () { },
    big: false,
    type: 'confirm'
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
    successEvent: function (data) { }
};
