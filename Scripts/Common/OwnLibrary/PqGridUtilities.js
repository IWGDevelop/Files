function createBasicGrid(grid, options) {
    on();
    var columns = generateColumns(options.columns, options.onCheck != undefined);
    var obj = generateBasicOptions(options, columns);
    return grid.pqGrid(obj);
}
function createDetailsGrid(grid, options, detailsOptions) {
    on();
    var columns = generateColumns(options.columns, options.onCheck != undefined, true);
    var obj = generateBasicOptions(options, columns);
    obj.detailModel = {
        cache: true,
        collapseIcon: 'ui-icon-plus',
        expandIcon: 'ui-icon-minus',
        init: function (ui) {
            if (detailsOptions.onOpenDetail !== undefined) {
                detailsOptions.onOpenDetail(ui.rowData, detailsOptions);
            }
            return createBasicGrid($('<div id="grdDetails"></div>'), detailsOptions);
        }
    };
    return grid.pqGrid(obj);
}
function generateColumns(optionColumns, check, details) {
    if (details === void 0) { details = false; }
    var columns = [];
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
    var _loop_1 = function (column) {
        columns.push({
            title: column.title,
            dataType: column.dataType,
            type: column.type,
            cb: column.cb,
            dataIndx: column.columnName.split('|')[0],
            editor: column.editor,
            editable: column.editor !== undefined,
            render: column.render != undefined ? column.render : function (ui) {
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
    };
    for (var _i = 0, optionColumns_1 = optionColumns; _i < optionColumns_1.length; _i++) {
        var column = optionColumns_1[_i];
        _loop_1(column);
    }
    return columns;
}
function generateToolbar(optionsToolbarItems) {
    var toolbar = { items: [] };
    for (var _i = 0, optionsToolbarItems_1 = optionsToolbarItems; _i < optionsToolbarItems_1.length; _i++) {
        var item = optionsToolbarItems_1[_i];
        var theType = '';
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
function generateBasicOptions(options, columns) {
    var showToolbar = false;
    var toolbar = { items: [] };
    if (options.toolbarItems != undefined) {
        toolbar = generateToolbar(options.toolbarItems);
        showToolbar = true;
    }
    var basicOptions = {
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
        rowBorders: false,
        showTitle: false,
        stripeRows: true,
        check: options.onCheck !== undefined ? options.onCheck.check : function (event, ui) {
            return false;
        },
        unCheck: options.onCheck !== undefined ? options.onCheck.unCheck : function (event, ui) {
            return false;
        },
        change: options.change !== undefined ? options.change : function (event, ui) {
        },
        selectionModel: {
            type: options.onCheck === undefined ? 'row' : null,
            fireSelectChange: false,
            mode: options.onCheck === undefined ? 'single' : null
        },
        rowDblClick: function (event, ui) {
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
        load: function (event, ui) {
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
            getData: function (dataJson, status, jqXhr) {
                return { curPage: 1, totalRecords: dataJson.length, data: dataJson };
            }
        },
        colModel: columns
    };
    return basicOptions;
}
