//Version 12
function setDefaults(options, defaults) {
    return Object.assign({}, defaults, options);
}
class OptionsBootstrapSelect {
}
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
    autoSelect: true
};
class OptionsGenerateBootbox {
}
var defaultsGenerateBootbox = {
    title: 'Bootbox',
    loadUrl: '',
    loadData: {},
    loadCallback: (response) => { },
    bootboxCallback: () => { },
    big: false,
    type: 'confirm'
};
class OptionsConsecutive {
}
var defaultsConsecutive = {
    documentId: 0,
    businessUnitId: 0,
    serviceTypeId: 0,
    companyId: 1,
    saveOp: false,
    successEvent: (data) => { }
};
