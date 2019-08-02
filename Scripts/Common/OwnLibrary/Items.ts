//Version 15

function getCargoInfoItem(cargo: CargoInfoItem): Item {

    cargo.Weight = parseFloat(cargo.Weight).toFixed(2);
    cargo.Volume = parseFloat(cargo.Volume).toFixed(2);
    cargo.Width = parseFloat(cargo.Width).toFixed(2);
    cargo.Height = parseFloat(cargo.Height).toFixed(2);
    cargo.Length = parseFloat(cargo.Length).toFixed(2);

    let newObject = new Item();
    let weightX = cargo.CargoHandling
        ? ''
        : ' -> ' + (parseFloat(cargo.Weight) * cargo.Quantity).toFixed(2) + ' ' + cargo.MeasureWeight;
    let volumeX = cargo.CargoHandling
        ? ''
        : ' -> ' + (parseFloat(cargo.Volume) * cargo.Quantity).toFixed(2) + ' ' + cargo.MeasureVolume;

    let linerTermHtml = cargo.LinerTerm !== 'Seleccione'
        ? '<em> <span style="font-size:12px;"> <span style="font-family:arial,helvetica,sans-serif; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; line-height: 16px; max-height: 32px; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">' +
        cargo.LinerTerm +
        '</span> </span> </em>'
        : '';
    let dimentionsHtml = cargo.CargoHandling === false
        ? cargo.Length + ' x ' + cargo.Width + ' x ' + cargo.Height + ' ' + cargo.MeasureDimentions
        : 'Sin dimensiones establecidas';

    let imagePacking = ' <img alt="" src="' +
        cargo.PackingUrl +
        '" style="margin-right:16px; width: 64px; float: left; height: 64px;" /> ';
    let imageClassImo = '';
    if (cargo.Imo != undefined && cargo.Imo !== '') {
        imageClassImo = '<img alt="" src="' +
            cargo.ImoUrl +
            '" style="width: 64px; height: 64px; float: left;" />';
    }

    newObject.divId = 'CargoInfo' + cargo.Id;
    newObject.html = '<div id="' +
        newObject.divId +
        '" class="panel-body col-md-6 item-cargo-info"> <hidden id="Hdn' +
        newObject.divId +
        '"></hidden> <label style="font-size:22px; font-family:arial,helvetica,sans-serif;"> ' +
        cargo.PropertiesFreight +
        '&nbsp; </label> <button class="mdl-button mdl-js-button ripple" id="btnDelete' +
        newObject.divId +
        '" type="button" style="float: right; padding: 4px !important; margin: 0px !important; min-width: 0px !important; line-height:0px !important; height:100% !important;"> <i class="material-icons">delete_forever</i> </button> <button class="mdl-button mdl-js-button ripple" id="btnEdit' +
        newObject.divId +
        '" type="button" style="float: right; padding: 4px !important; margin: 0px !important; min-width: 0px !important; line-height:0px !important; height:100% !important;"> <i class="material-icons">edit</i> </button> <hr/> ' +
        linerTermHtml +
        ' <label style="font-family:arial,helvetica,sans-serif; font-size:14px; font-weight:100; margin-bottom:16px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; line-height: 16px; max-height: 32px; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">' +
        cargo.CargoDescription +
        '</label> <span style="font-size:40px; font-family:arial,helvetica,sans-serif; margin-left:16px; margin-right:48px; float:right;">x' +
        cargo.Quantity +
        '</span> <div> ' +
        imagePacking +
        '<span style="font-size:12px;"> <span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' +
        dimentionsHtml +
        ' ' +
        imageClassImo +
        '</span> </span> </div><div> <span style="font-size:12px;"><span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' +
        cargo.Volume +
        ' ' +
        cargo.MeasureVolume +
        volumeX +
        '</span> </span> </div><div> <span style="font-size:12px;"><span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' +
        cargo.Weight +
        ' ' +
        cargo.MeasureWeight +
        weightX +
        '</span> </span> </div></div>';

    newObject.item = cargo;

    return newObject;
}

function createTrackingOrder(item: TrackingOrderItem): Item {
    const newItem = new Item();

    const tNumber = item.OrderNumber === undefined || item.OrderNumber === '' || item.OrderNumber === null
        ? 'Sin número de pedido'
        : 'Pedido #' + item.OrderNumber;
    const tShipper = item.Shipper == undefined || item.Shipper === '' || item.Shipper == null
        ? 'Sin shipper'
        : item.Shipper;
    const tWarehouse = item.Warehouse === undefined || item.Warehouse === '' || item.Warehouse === null
        ? 'El Warehouse aun es desconocido.'
        : 'El pedido ingresa bajo el número de warehouse <strong>' + item.Warehouse + ' </strong>.';
    const tDateWarehouse = item.DateIngressWarehouse === undefined ||
        item.DateIngressWarehouse === '' ||
        item.DateIngressWarehouse === null
        ? 'La fecha de Ingreso es desconocida.'
        : 'Ingresó el <strong>' + item.DateIngressWarehouse + '</strong>.';

    newItem.divId = 'TrackingOrder' + item.Id;
    newItem.html = '<div id="' +
        newItem.divId +
        '" class="tracking-order-panel"> <div> <hidden id="Hdn' +
        newItem.divId +
        '"></hidden> <label style="font-family:roboto; font-size:22px; font-weight:600;">' +
        tNumber +
        ' / </label> <i> <label style="font-family:roboto; font-size:14px; font-weight:100">' +
        tShipper +
        '</label> </i> <img id="imgShipperInfo' +
        newItem.divId +
        '" src="https://raw.githubusercontent.com/IWGDevelop/Files/master/Images/Icons/ic_info.png" style="width:20px; height:20px; margin:0px"><button class="mdl-button mdl-js-button ripple" id="btnDelete' +
        newItem.divId +
        '" type="button" style="float: right; padding: 4px !important; margin: 0px !important; min-width: 0px !important; line-height:0px !important; height:100% !important;"> <i class="material-icons">delete_forever</i> </button> <button class="mdl-button mdl-js-button ripple" id="btnEdit' +
        newItem.divId +
        '" type="button" style="float: right; padding: 4px !important; margin: 0px !important; min-width: 0px !important; line-height:0px !important; height:100% !important;"> <i class="material-icons">edit</i> </button> <hr/> <label style="float:right; font-family:roboto; font-size:42px; font-weight:600; margin-right:12px;">' +
        item.Incoterm +
        '</label> </div><div> <label style="font-family:roboto, cursive; font-size:16px; font-weight:100;">' +
        tWarehouse +
        ' ' +
        tDateWarehouse +
        '</label> </div><div id="trackingOrderCargoList"> </div></div>';

    newItem.item = item;

    return newItem;
}

function createDraggableTrackingOrder(item: TrackingOrderItem): Item {
    const newItem = new Item();

    const tNumber = item.OrderNumber === undefined || item.OrderNumber === '' || item.OrderNumber === null
        ? 'Sin número de pedido'
        : 'Pedido #' + item.OrderNumber;
    const tShipper = item.Shipper == undefined || item.Shipper === '' || item.Shipper == null
        ? 'Sin shipper'
        : item.Shipper;
    const tWarehouse = item.Warehouse === undefined || item.Warehouse === '' || item.Warehouse === null
        ? 'El Warehouse aun es desconocido.'
        : 'El pedido ingresa bajo el número de warehouse <strong>' + item.Warehouse + ' </strong>.';
    const tDateWarehouse = item.DateIngressWarehouse === undefined ||
        item.DateIngressWarehouse === '' ||
        item.DateIngressWarehouse === null
        ? 'La fecha de Ingreso es desconocida.'
        : 'Ingresó el <strong>' + item.DateIngressWarehouse + '</strong>.';

    newItem.divId = 'TrackingOrder' + item.Id;
    newItem.html = '<div id="' +
        newItem.divId +
        '" class="tracking-order-panel"> <div> <hidden id="Hdn' +
        newItem.divId +
        '"></hidden> <label style="font-family:roboto; font-size:22px; font-weight:600;">' +
        tNumber +
        ' / </label> <i> <label id="lblShipper' +
        newItem.divId +
        '" style="font-family:roboto; font-size:14px; font-weight:100">' +
        tShipper +
        '</label> </i><label id="lblIncoterm' +
        newItem.divId +
        '" style="float:right; font-family:roboto; font-size:24px; font-weight:600; margin-right:12px;">' +
        item.Incoterm +
        '</label> <hr style="margin: 0 0 8px 0;"/> </div><div> <label id="lblWeight' +
        newItem.divId +
        '" style="width: 100%">Peso total: </label><label id="lblVolume' +
        newItem.divId +
        '" style="width: 100%">Volumen total: </label><label id="lblPieces' +
        newItem.divId +
        '" style="width: 100%">Volumen total: </label><label style="font-family:roboto, cursive; font-size:16px; font-weight:100; width: 100%">' +
        tWarehouse +
        ' ' +
        tDateWarehouse +
        '</label> </div><div id="trackingOrderCargoList"> </div></div>';

    newItem.item = item;

    return newItem;
}

class Item {
    id: number;
    divId: string;
    html: string;
    item: any;
}

class TrackingOrderItem {
    Id?: number;
    OrderNumber: string;
    Shipper: string;
    ShipperId: string;
    IsShipperProspect: boolean;
    Incoterm: string;
    IncotermId: string;
    Warehouse: string;
    DateIngressWarehouse: string;
    CustomsExpiration: string;
    TrackingId: number;
    SubsidiaryId: number;
    SenderId: string;
    IsSenderProspect: boolean;
    AddresseeId: string;
    IsAddresseeProspect: boolean;
    Weight?: number;
    Volume?: number;
    Pieces?: number;
}

class CargoInfoItem {
    Id: number;
    PropertiesFreight: string;
    PropertiesFreightId: number;
    LinerTerm: string;
    LinerTermId: number;
    CargoDescription: string;
    Packing: string;
    PackingId: number;
    PackingUrl: string;
    Length: string;
    Weight: string;
    Width: string;
    MeasureDimentions: string;
    MeasurementUDimensionsId: number;
    MeasureVolume: string;
    MeasurementUVolumeId: number;
    MeasureWeight: string;
    MeasurementUWeightId: number;
    Imo: string;
    ImoId: number;
    ImoUrl: string;
    Volume: string;
    Height: string;
    Quantity: number;
    TypeOfCargo: string;
    CargoHandling: boolean;
}

class CargoInfoLite {
    Id: number;
    Description: string;
    PackingUrl: string;
    ImoUrl: string;
    Quantity: number;
    MeasureWeightId: number;
    MeasureWeight: string;
    Weight: number;
    MeasureVolumeId: number;
    MeasureVolume: string;
    Volume: number;
}