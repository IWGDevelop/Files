function createBasicGrid(grid, options) {
    on();
    let columns = generateColumns(options.columns, options.onCheck != undefined);
    let dataModel = generateDataModel(options);
    let obj = generateBasicOptions(grid, options, columns, dataModel);
    return grid.pqGrid(obj);
}
function createDetailsGrid(grid, options, detailsOptions) {
    on();
    let columns = generateColumns(options.columns, options.onCheck != undefined, true);
    let dataModel = generateDataModel(options);
    let obj = generateBasicOptions(grid, options, columns, dataModel);
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
function createDetailsLocalGrid(grid, options, detailsOptions, data, columnDetailsData) {
    on();
    let columns = generateColumns(options.columns, options.onCheck != undefined, true);
    let dataModel = generateDataModel(options, data);
    let obj = generateBasicOptions(grid, options, columns, dataModel);
    obj.detailModel = {
        cache: true,
        collapseIcon: 'ui-icon-plus',
        expandIcon: 'ui-icon-minus',
        init: (ui) => {
            if (detailsOptions.onOpenDetail !== undefined) {
                detailsOptions.onOpenDetail(ui.rowData, detailsOptions);
            }
            if (columnDetailsData == undefined) {
                return createBasicGrid($('<div id="grdDetails"></div>'), detailsOptions);
            }
            else {
                return createBasicLocalGrid($('<div id="grdDetails"></div>'), detailsOptions, ui.rowData[columnDetailsData]);
            }
        }
    };
    return grid.pqGrid(obj);
}
function createBasicLocalGrid(grid, options, data) {
    let columns = generateColumns(options.columns, options.onCheck != undefined);
    let dataModel = generateDataModel(options, data);
    let obj = generateBasicOptions(grid, options, columns, dataModel);
    return grid.pqGrid(obj);
}
function createBasicEditableGrid(grid, options) {
    let columns = generateColumns(options.columns, options.onCheck != undefined);
    let dataModel = generateDataModel(options);
    let obj = generateBasicOptions(grid, options, columns, dataModel);
    obj.selectionModel = {
        type: 'cell'
    };
    obj.editModel = {
        onSave: 'next'
    };
    obj.editor = { type: 'textbox', select: true, style: 'outline:none;' };
    obj.validation = {
        icon: 'ui-icon-info'
    };
    obj.editable = (ui) => {
        return true;
    };
    return grid.pqGrid(obj);
}
function createBasicLocalEditableGrid(grid, options, data) {
    let columns = generateColumns(options.columns, options.onCheck != undefined);
    let dataModel = generateDataModel(options, data);
    let obj = generateBasicOptions(grid, options, columns, dataModel);
    obj.selectionModel = {
        type: 'cell'
    };
    obj.editModel = {
        onSave: 'next'
    };
    obj.editor = { type: 'textbox', select: true, style: 'outline:none;' };
    obj.validation = {
        icon: 'ui-icon-info'
    };
    obj.editable = (ui) => {
        return true;
    };
    return grid.pqGrid(obj);
}
function generateColumns(optionColumns, check, details = false) {
    let columns = [];
    if (details) {
        columns.push({ title: '', maxWidth: 30, minWidth: 30, type: 'detail', resizable: false, editable: false });
    }
    if (check) {
        columns.push({
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
            hidden: column.show === undefined ? false : !column.show,
            editable: column.editor !== undefined,
            render: column.render != undefined ? column.render : (ui) => {
                if (ui.cellData === null && column.columnName.split('|').length > 1) {
                    ui.cellData = ui.rowData[column.columnName.split('|')[1]];
                }
                if (column.dataType === 'date') {
                    if (ui.cellData.indexOf('/') !== -1) {
                        return getFormatedDate(new Date(parseInt(ui.cellData.substr(6))), true);
                    }
                    else {
                        return getFormatedDate(new Date(ui.cellData), true);
                    }
                }
                return ui.cellData;
            },
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        });
    }
    return columns;
}
function generateToolbar(grid, optionsToolbarItems) {
    let toolbar = { items: [] };
    for (let item of optionsToolbarItems) {
        let theType = '';
        let theListener;
        switch (item.type) {
            case 'button':
                theType = '<input type="button" class="primary-button" style="margin: 0 16px 0 0" value="' + item.text + '"></input>';
                theListener = item.listener;
                break;
            case 'saveInline':
                theType = '<input type="button" class="primary-button" style="margin: 0 16px 0 0" value="' + item.text + '"></input>';
                theListener = (evt, ui) => {
                    grid.pqGrid("addRow", { rowData: {}, rowIndx: 0 });
                    grid.pqGrid("goToPage", { rowIndx: 0 });
                    grid.pqGrid("setSelection", null);
                    grid.pqGrid("setSelection", {});
                    grid.pqGrid("editFirstCellInRow", { rowIndx: 0 });
                };
                break;
            default:
                break;
        }
        toolbar.items.push({
            type: theType,
            listeners: [{ click: theListener }]
        });
    }
    return toolbar;
}
function generateDataModel(options, dataJson) {
    if (dataJson === undefined) {
        return {
            location: 'remote',
            sorting: 'local',
            sortDir: 'up',
            url: options.urlLoad === undefined ? getRootUrl() + options.controller + '/' + options.actionGetData : options.urlLoad,
            postData: options.dataParams,
            dataType: 'JSON',
            method: 'GET',
            getData: (dataJson, status, jqXhr) => {
                return { curPage: 1, totalRecords: dataJson.length, data: dataJson };
            }
        };
    }
    else {
        return {
            data: dataJson,
            location: 'local',
            sorting: 'local',
            sortDir: 'up'
        };
    }
}
function generateBasicOptions(grid, options, columns, dataModel) {
    let showToolbar = false;
    let toolbar = { items: [] };
    if (options.toolbarItems != undefined) {
        toolbar = generateToolbar(grid, options.toolbarItems);
        showToolbar = true;
    }
    let basicOptions = {
        scrollModel: { autoFit: true },
        width: '100%',
        height: options.height === undefined ? 400 : options.height,
        flex: false,
        filterModel: {
            on: true, mode: "AND", header: true, type: 'local'
        },
        collapsible: true,
        draggable: false,
        editable: true,
        numberCell: { show: false },
        pageModel: { type: 'local', rPP: 50, strRpp: '{0}', strDisplay: '{0} a {1} de {2}' },
        toolbar: toolbar,
        showToolbar: showToolbar,
        showBottom: options.footer,
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
                }
                else {
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
        dataModel: dataModel,
        colModel: columns
    };
    return basicOptions;
}
