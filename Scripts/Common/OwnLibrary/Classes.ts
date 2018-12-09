//Version 8

function setDefaults(options, defaults) {
    return (<any>Object).assign({}, defaults, options);
}

class OptionsBootstrapSelect {
    text?: string;
    extraOption?: string;
    enable?: boolean;
    subTextOption?: string;
    limitSubTextOption?: number;
    showSubtext?: boolean;
    value?: any;
    async?: boolean;
}

var defaultsBootstrapSelect = {
    text: "Description",
    extraOption: "",
    enable: false,
    subTextOption: "",
    limitSubTextOption: 0,
    showSubtext: false,
    value: 0,
    async: true
};

class OptionsGenerateBootbox {
    title?: string;
    loadUrl?: string;
    loadData?: string | Object;
    loadCallback?: Function;
    bootboxCallback?: any;
    big?: boolean;
    type?: 'alert' | 'confirm' | 'dialog';
}

var defaultsGenerateBootbox = {
    title: "Bootbox",
    loadUrl: "",
    loadData: {},
    loadCallback: (response) => { },
    bootboxCallback: () => { },
    big: false,
    type: 'confirm'
};


class OptionsConsecutive {
    documentId: number;
    businessUnitId?: number;
    serviceTypeId?: number;
    companyId?: number;
    saveOp?: boolean;
    successEvent?: Function;
}

var defaultsConsecutive = {
    documentId: 0,
    businessUnitId: 0,
    serviceTypeId: 0,
    companyId: 1,
    saveOp: false,
    successEvent: (data) => { }
};
