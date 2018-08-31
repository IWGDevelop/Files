//Version 4
function setDefaults(options, defaults) {
    return Object.assign({}, defaults, options);
}
var OptionsBootstrapSelect = /** @class */ (function () {
    function OptionsBootstrapSelect() {
    }
    return OptionsBootstrapSelect;
}());
var defaultsBootstrapSelect = {
    text: "Description",
    extraOption: "",
    enable: false,
    subTextOption: "",
    limitSubTextOption: 0
};
var OptionsGenerateBootbox = /** @class */ (function () {
    function OptionsGenerateBootbox() {
    }
    return OptionsGenerateBootbox;
}());
var defaultsGenerateBootbox = {
    title: "Bootbox",
    loadUrl: "",
    loadData: {},
    loadCallback: function (response) { },
    bootboxCallback: function () { },
    big: false,
    type: 'confirm'
};
var OptionsConsecutive = /** @class */ (function () {
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
