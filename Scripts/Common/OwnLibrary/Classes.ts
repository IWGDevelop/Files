//Version 14

function setDefaults(options: any, defaults: any) {
    return (<any>Object).assign({}, defaults, options);
}

class OptionsBootstrapSelect {
    text?: string;
    extraOption?: string;
    extraOption2?: string;
    enable?: boolean;
    subTextOption?: string;
    limitSubTextOption?: number;
    showSubtext?: boolean;
    value?: any;
    async?: boolean;
    urlValues?: string;
    autoSelect?: boolean;
    callback?: () => void;
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
    autoSelect: true,
    callback: () => { }
};

class OptionsModal {
    title: string;
    type: 'partialView' | 'grid' | 'html';
    loadUrl?: string;
    loadData?: string | Object;
    loadCallback?: Function;
    closeCallback?: any;
    html?: string;
    gridOptions?: PqGridUtilitiesOptions;
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
    successEvent: (data) => {
    }
};