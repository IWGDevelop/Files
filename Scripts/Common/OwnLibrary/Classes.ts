//Version 15

function setDefaults(options: any, defaults: any) {
    return (<any>Object).assign({}, defaults, options);
}

/*
 * text: Nombre de la propiedad que se va a mostrar en el texto principal
 * extraOption: Opción extra que se agrega al data del objeto html para su posterior uso
 * extraOption2: Segunda opción extra que se agrega al data del objeto html para su posterior uso (En deshúso)
 * enable: Si es true y el Select está deshabilitado, lo habilita
 * subTextOption: Nombre de la propiedad que se va a mostrar en el texto secundario. (Debe estar acompañado por la propiedad data_show_subtext = "true" en el HTML)
 * limitSubTextOption: Cantidad límite de caracteres a mostrar en el texto secundario
 * showSubtext: Si es true, muestra el texto secundario (En deshúso)
 * value: Si se pone algún valor, por defecto lo seleccionará al llenar el Select (Excluyente con urlValues)
 * async: Si es false, el Select se llenará síncronamente
 * urlValues: Url de donde debe buscar los valores a seleccionar por defecto (Excluyente con value)
 * autoSelect: Si es true y el Select solo tiene una opción, la selecciona automáticamente
 * callback: Método a ejecutar luego de llenar el Select
 */
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

/*
 * title
 * type
 * loadUrl
 * loadData
 * loadCallback
 * closeCallback
 * html
 * gridOptions
 * gridData
 */
class OptionsModal {
    title: string;
    type: 'partialView' | 'grid' | 'localgrid' | 'html';
    loadUrl?: string;
    loadData?: string | Object;
    loadCallback?: Function;
    closeCallback?: any;
    html?: string;
    gridOptions?: PqGridUtilitiesOptions;
    gridData?: any
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