// Version 1
function createBasicGrid(grid, options) {
    let showToolbar = false;
    let columns = [];
    let toolbar = { items: [] };
    for (let column of options.columns) {
        columns.push({
            title: column.title,
            dataType: column.type,
            dataIndx: column.columnName.split('|')[0],
            render: (ui) => {
                if (ui.cellData === null && column.columnName.split('|').length > 1) {
                    ui.cellData = ui.rowData[column.columnName.split('|')[1]];
                }
                if (column.type === 'date') {
                    return getFormatedDate(new Date(parseInt(ui.cellData.substr(6))), true);
                }
                return ui.cellData;
            }
        });
    }
    if (options.toolbarItems != undefined) {
        for (let item of options.toolbarItems) {
            let theType = '';
            switch (item.type) {
                case 'newButton':
                    theType = '<button class="primary-button">Nuevo</button>';
                    break;
                default:
                    break;
            }
            toolbar.items.push({
                type: theType,
                listeners: [{ click: item.listener }]
            });
            showToolbar = true;
        }
    }
    let obj = {
        scrollModel: { autoFit: true },
        width: '100%',
        height: 400,
        flex: false,
        collapsible: true,
        draggable: false,
        editable: false,
        numberCell: { show: false },
        pageModel: { type: 'local', rPP: 20, strRpp: '{0}', strDisplay: '{0} a {1} de {2}' },
        toolbar: toolbar,
        rowBorders: false,
        showTitle: false,
        showToolbar: showToolbar,
        stripeRows: true,
        selectionModel: {
            type: 'row',
            fireSelectChange: false,
            mode: 'single'
        },
        rowDblClick: (event, ui) => {
            if (options.actionToClick === undefined) {
                on();
                window.location.href = rootPath + options.controller + '/' + options.actionToClick + '/' + ui.rowData['Id'];
            }
        },
        load: (event, ui) => {
            if (options.actionLoaded != undefined) {
                options.actionLoaded(event, ui);
            }
        },
        dataModel: {
            location: 'remote',
            url: rootPath + options.controller + '/' + options.actionGetData,
            postData: options.dataParams,
            dataType: 'JSON',
            method: 'POST',
            getData: (dataJson, status, jqXhr) => {
                return { curPage: 1, totalRecords: dataJson.length, data: dataJson };
            }
        },
        colModel: columns
    };
    grid.pqGrid(obj);
}
class PqGridUtilitiesOptions {
    constructor() {
        this.actionToClick = null;
        this.toolbarItems = [];
    }
}
class PqGridUtilitiesColumn {
    constructor() {
        this.type = 'string';
    }
}
class PqGridUtilitiesToolbarItem {
}
