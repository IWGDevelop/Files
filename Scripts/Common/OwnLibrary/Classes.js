//Version 13
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
class OptionsModal {
}
var defaultsModal = {
    title: 'Modal',
    type: 'partialView',
    loadUrl: '',
    loadData: {},
    loadCallback: (response) => {
    },
    closeCallback: (response) => {
    },
    html: '',
    gridOptions: {}
};
class OptionsConsecutive {
}
var defaultsConsecutive = {
    documentId: 0,
    businessUnitId: 0,
    serviceTypeId: 0,
    companyId: 1,
    saveOp: false,
    successEvent: (data) => {
    }
};
