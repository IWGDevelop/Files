// Version 14

function createBasicGrid(grid: JQuery, options: PqGridUtilitiesOptions) {
    on();
    let columns: PqGridColumn[] = generateColumns(options.columns, options.onCheck != undefined);
    let obj: PqGridOptions = generateBasicOptions(options, columns);
    return grid.pqGrid(obj);
}

function createDetailsGrid(grid: JQuery, options: PqGridUtilitiesOptions, detailsOptions: PqGridUtilitiesOptions) {
    on();
    let columns = generateColumns(options.columns, options.onCheck != undefined, true);
    let obj: PqGridOptions = generateBasicOptions(options, columns);
    obj.detailModel = {
        cache: true,
        collapseIcon: 'ui-icon-plus',
        expandIcon: 'ui-icon-minus',
        init: (ui) => {
            if (detailsOptions.onOpenDetail !== undefined) {
                detailsOptions.onOpenDetail(ui.rowData, detailsOptions);
            }
            return createBasicGrid($('<div id="grdDetails"></div>'), detailsOptions);
        }
    };

    return grid.pqGrid(obj);
}


// Métodos de ayuda

function generateColumns(optionColumns: PqGridUtilitiesColumn[], check: boolean, details: boolean = false): PqGridColumn[] {
    let columns: PqGridColumn[] = [];

    if (details) {
        columns.push({ title: '', maxWidth: 30, minWidth: 30, type: 'detail', resizable: false, editable: false });
    }

    if (check) {
        columns.push(
            {
                title: '', dataIndx: 'state1', maxWidth: 30, minWidth: 30, align: 'center', resizable: false,
                type: 'checkBoxSelection', cls: 'ui-state-default', sortable: false, editable: false,
                cb: { all: false, header: true }
            });
    }

    for (let column of optionColumns) {
        columns.push({
            title: column.title,
            dataType: column.dataType,
            type: column.type,
            cb: column.cb,
            dataIndx: column.columnName.split('|')[0],
            editor: column.editor,
            editable: column.editor !== undefined,
            render: column.render != undefined ? column.render : (ui) => {
                if (ui.cellData === null && column.columnName.split('|').length > 1) {
                    ui.cellData = ui.rowData[column.columnName.split('|')[1]];
                }

                if (column.dataType === 'date') {
                    return getFormatedDate(new Date(parseInt(ui.cellData.substr(6))), true);
                }

                return ui.cellData;
            },
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        });
    }

    return columns;
}

function generateToolbar(optionsToolbarItems: PqGridUtilitiesToolbarItem[]): PqGridToolbar{
    let toolbar: PqGridToolbar = { items: [] };

    for (let item of optionsToolbarItems) {
        let theType = '';
        switch (item.type) {
            case 'button':
                theType = '<button class="primary-button" style="margin: 0 16px 0 0">' + item.text + '</button>';
                break;
            default:
                break;
        }
        toolbar.items.push({
            type: theType,
            listeners: [{ click: item.listener }]
        });
    }

    return toolbar;
}

function generateBasicOptions(options: PqGridUtilitiesOptions, columns: PqGridColumn[]) {
    let showToolbar: boolean = false;
    let toolbar: PqGridToolbar = { items: [] };

    if (options.toolbarItems != undefined) {
        toolbar = generateToolbar(options.toolbarItems);
        showToolbar = true;
    }

    let basicOptions: PqGridOptions = {
        scrollModel: { autoFit: true },
        width: '100%',
        height: options.height === undefined ? 400 : options.height,
        flex: false,
        filterModel: {
            on: true, mode: "AND", header: true, type: 'local' },
        collapsible: true,
        draggable: false,
        editable: true,
        numberCell: { show: false },
        pageModel: { type: 'local', rPP: 50, strRpp: '{0}', strDisplay: '{0} a {1} de {2}' },
        toolbar: toolbar,
        showToolbar: showToolbar,
        rowBorders: false,
        showTitle: false,
        stripeRows: true,
        check: options.onCheck !== undefined ? options.onCheck.check : (event, ui) => {
            return false;
        },
        unCheck: options.onCheck !== undefined ? options.onCheck.unCheck : (event, ui) => {
            return false;
        },
        change: options.change !== undefined ? options.change : (event, ui) => {
        },
        selectionModel: {
            type: options.onCheck === undefined ? 'row' : null,
            fireSelectChange: false,
            mode: options.onCheck === undefined ? 'single' : null
        },
        rowDblClick: (event, ui) => {
            if (options.actionToDoubleClick !== undefined) {
                on();
                if (typeof options.actionToDoubleClick == 'string') {
                    window.location.href = getRootUrl() +
                        options.controller +
                        '/' +
                        options.actionToDoubleClick +
                        '/' +
                        ui.rowData['Id'];
                } else {
                    options.actionToDoubleClick(event, ui);
                    off();
                }
            }
        },
        load: (event, ui) => {
            if (options.actionLoaded != undefined) {
                options.actionLoaded(event, ui);
            }
            off();
        },
        dataModel: {
            location: 'remote',
            sorting: "local",
            sortDir: "up",
            url: options.urlLoad === undefined ? getRootUrl() + options.controller + '/' + options.actionGetData : options.urlLoad,
            postData: options.dataParams,
            dataType: 'JSON',
            method: 'GET',
            getData: (dataJson, status, jqXhr) => {
                return { curPage: 1, totalRecords: dataJson.length, data: dataJson }
            }
        },
        colModel: columns
    };

    return basicOptions;
}

// Clases y tipos

type FunctionType = (event: any, ui: any) => void;
type StringType = 'Details' | 'Edit' | 'Create';

interface PqGridUtilitiesOptions {
    controller: string;
    urlLoad?: string;
    actionToDoubleClick?: StringType | FunctionType;

    actionLoaded?(event: any, ui: any): void;

    change?(event: any, ui: any): void;

    actionGetData: string;
    dataParams?: any;
    columns: PqGridUtilitiesColumn[];
    toolbarItems?: PqGridUtilitiesToolbarItem[];
    onCheck?: OnCheck;
    onOpenDetail?(rowData: any, detailsOptions: PqGridUtilitiesOptions): void;
    height?: number;
}

interface PqGridUtilitiesColumn {
    title: string;
    columnName: string;
    dataType?: 'string' | 'integer' | 'float' | 'date' | Function;
    type?: 'checkBoxSelection';
    cb?: any;
    editor?: Editor;
    render?(ui): string;
}

interface PqGridUtilitiesToolbarItem {
    type: string;
    text: string;
    listener: Function;
}

interface Editor {
    type: 'textbox' | 'textarea' | 'contenteditable' | 'select' | 'checkbox' | Function;
    mapIndices?: any;
    labelIndx?: string;
    valueIndx?: string;
    options?: any;
}

interface OnCheck {
    check(event: any, ui: any): boolean;
    unCheck(event: any, ui: any): boolean;
}