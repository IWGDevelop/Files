//Version 3

function setDefaults(options, defaults) {
    return (<any>Object).assign({}, defaults, options);
}

class OptionsBootstrapSelect {
    text?: string;
    extraOption?: string;
    enable?: boolean;
    subTextOption?: string;
    limitSubTextOption?: number;
}

var defaultsBootstrapSelect = {
    text: "Description",
    extraOption: "",
    enable: false,
    subTextOption: "",
    limitSubTextOption: 0
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
