//Version 11
class Item {
}
function getCargoInfoItem(id, propertiesFreight, linerTerm, description, packing, length, height, width, measureDimentions, imoClass, volume, measureVolume, weight, measureWeight, quantity, typeOfCargo) {
    weight = parseFloat(weight).toFixed(2);
    volume = parseFloat(volume).toFixed(2);
    width = parseFloat(width).toFixed(2);
    height = parseFloat(height).toFixed(2);
    length = parseFloat(length).toFixed(2);
    let cargoItem = {};
    let weightX = (parseFloat(weight) * quantity).toFixed(2);
    let volumeX = (parseFloat(volume) * quantity).toFixed(2);
    let linerTermHtml = linerTerm.find(':selected').text() !== 'Seleccione' ? '<em> <span style="font-size:12px;"> <span style="font-family:arial,helvetica,sans-serif; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; line-height: 16px; max-height: 32px; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">' + linerTerm.find(':selected').text() + '</span> </span> </em>' : '';
    let dimentionsHtml = typeOfCargo !== 'FCL' ? length + ' x ' + height + ' x ' + width + ' ' + measureDimentions.find(':selected').text() : 'Sin dimensiones establecidas';
    let imagePacking = ' <img alt="" src="' + packing.find(':selected').attr('data-urlimage') + '" style="margin-right:16px; width: 64px; float: left; height: 64px;" /> ';
    let imageClassImo = '';
    if (imoClass.val() != undefined && imoClass.val() !== '') {
        imageClassImo = '<img alt="" src="' + imoClass.find(':selected').attr('data-urlimage') + '" style="width: 64px; height: 64px; float: left;" />';
    }
    cargoItem['id'] = 'CargoInfo' + id;
    cargoItem['html'] = '<div id="' + cargoItem['id'] + '" class="panel-body col-md-6 item-cargo-info"> <hidden id="Hdn' + cargoItem['id'] + '"></hidden> <label style="font-size:22px; font-family:arial,helvetica,sans-serif;"> ' + propertiesFreight.find(':selected').text() + '&nbsp; </label> <button class="mdl-button mdl-js-button ripple" id="btnDelete' + cargoItem['id'] + '" type="button" style="float: right; padding: 4px !important; margin: 0px !important; min-width: 0px !important; line-height:0px !important; height:100% !important;"> <i class="material-icons">delete_forever</i> </button> <button class="mdl-button mdl-js-button ripple" id="btnEdit' + cargoItem['id'] + '" type="button" style="float: right; padding: 4px !important; margin: 0px !important; min-width: 0px !important; line-height:0px !important; height:100% !important;"> <i class="material-icons">edit</i> </button> <hr/> ' + linerTermHtml + ' <label style="font-family:arial,helvetica,sans-serif; font-size:14px; font-weight:100; margin-bottom:16px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; line-height: 16px; max-height: 32px; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">' + description + '</label> <span style="font-size:40px; font-family:arial,helvetica,sans-serif; margin-left:16px; margin-right:48px; float:right;">x' + quantity + '</span> <div> ' + imagePacking + '<span style="font-size:12px;"> <span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' + dimentionsHtml + ' ' + imageClassImo + '</span> </span> </div><div> <span style="font-size:12px;"><span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' + volume + ' ' + measureVolume.find(':selected').text() + ' -> ' + volumeX + ' ' + measureVolume.find(':selected').text() + '</span> </span> </div><div> <span style="font-size:12px;"><span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' + weight + ' ' + measureWeight.find(':selected').text() + ' -> ' + weightX + ' ' + measureWeight.find(':selected').text() + '</span> </span> </div></div>';
    let piece = {};
    piece["Id"] = id;
    piece["CargoDescription"] = description;
    piece["PropertiesFreightId"] = propertiesFreight.val();
    piece["ImoId"] = imoClass.val();
    piece["PackingId"] = packing.val();
    piece["LinerTermId"] = linerTerm.val();
    piece["MeasurementUDimensionsId"] = typeOfCargo !== 'FCL' ? measureDimentions.val() : 0;
    piece["Length"] = typeOfCargo !== 'FCL' ? length : 0;
    piece["Width"] = typeOfCargo !== 'FCL' ? width : 0;
    piece["Height"] = typeOfCargo !== 'FCL' ? height : 0;
    piece["MeasurementUWeightId"] = measureWeight.val();
    piece["Weight"] = weight;
    piece["MeasurementUVolumeId"] = measureVolume.val();
    piece["Volume"] = volume;
    piece["Quantity"] = quantity;
    cargoItem['cargo'] = piece;
    return cargoItem;
}
function createTrackingOrder(index, number, shipper, isProspect, incoterm, warehouse, dateWarehouse, trackingId, id) {
    const trackingOrder = {};
    const tNumber = number === '' ? 'Sin número de pedido' : 'Pedido #' + number;
    const tShipper = (shipper.val() === '' || shipper.val() == null) ? 'Sin shipper' : shipper.find(':selected').text();
    const tWarehouse = warehouse === '' ? 'El Warehouse aun es desconocido.' : 'El pedido ingresa bajo el número de warehouse <strong>' + warehouse + ' </strong>.';
    const tDateWarehouse = dateWarehouse === '' ? 'La fecha de Ingreso es desconocida.' : 'Ingresó el <strong>' + dateWarehouse + '</strong>.';
    trackingOrder['id'] = 'TrackingOrder' + index;
    trackingOrder['html'] = '<div id="' + trackingOrder['id'] + '" class="tracking-order-panel"> <div> <hidden id="Hdn' + trackingOrder['id'] + '"></hidden> <label style="font-family:roboto; font-size:22px; font-weight:600;">' + tNumber + ' / </label> <i> <label style="font-family:roboto; font-size:14px; font-weight:100">' + tShipper + '</label> </i> <img id="imgShipperInfo' + trackingOrder['id'] + '" src="https://raw.githubusercontent.com/IWGDevelop/Images/master/icons/ic_info.png" style="width:20px; height:20px; margin:0px"><button class="mdl-button mdl-js-button ripple" id="btnDelete' + trackingOrder['id'] + '" type="button" style="float: right; padding: 4px !important; margin: 0px !important; min-width: 0px !important; line-height:0px !important; height:100% !important;"> <i class="material-icons">delete_forever</i> </button> <button class="mdl-button mdl-js-button ripple" id="btnEdit' + trackingOrder['id'] + '" type="button" style="float: right; padding: 4px !important; margin: 0px !important; min-width: 0px !important; line-height:0px !important; height:100% !important;"> <i class="material-icons">edit</i> </button> <hr/> <label style="float:right; font-family:roboto; font-size:42px; font-weight:600; margin-right:12px;">' + incoterm.find(':selected').text() + '</label> </div><div> <label style="font-family:roboto, cursive; font-size:16px; font-weight:100;">' + tWarehouse + ' ' + tDateWarehouse + '</label> </div><div id="trackingOrderCargoList"> </div></div>';
    const order = {};
    order["Id"] = id;
    order["TrackingId"] = trackingId;
    order["OrderNumber"] = number;
    order["ShipperId"] = shipper.val();
    order["IncotermId"] = incoterm.val();
    order["Warehouse"] = warehouse;
    order["DateIngressWarehouse"] = dateWarehouse;
    order["IsProspect"] = isProspect;
    trackingOrder['order'] = order;
    return trackingOrder;
}
function createDraggableCargoInfo(cargoInfoLite) {
    const cargoItem = new Item();
    const imagePacking = ' <img alt="" src="' + cargoInfoLite.PackingUrl + '" style="margin-right:16px; width: 64px; float: left; height: 64px;" /> ';
    let imageClassImo = '';
    if (cargoInfoLite.ImoUrl != null && cargoInfoLite.ImoUrl !== '') {
        imageClassImo = '<img alt="" src="' + cargoInfoLite.ImoUrl + '" style="width: 64px; height: 64px; float: left;" />';
    }
    cargoItem.id = cargoInfoLite.Id;
    cargoItem.divId = 'CargoInfo' + cargoInfoLite.Id;
    cargoItem.html = '<div id="' + cargoItem.divId + '" class="panel-body item-cargo-info-lite"> <hidden id="Hdn' + cargoItem.divId + '"></hidden> <label style="font-size:22px; font-family:arial,helvetica,sans-serif;">' + cargoInfoLite.Description + '</label><label style="font-size:14px; font-weight:100; margin-bottom:16px; text-overflow: ellipsis;"> x' + cargoInfoLite.Quantity + '</label> <hr style="margin-top: 0px;margin-bottom: 10px;"><label style="font-size:14px; font-weight:100; width:100%">' + cargoInfoLite.Weight + ' ' + cargoInfoLite.MeasureWeight + ' c/u</label><label style="font-size:14px; font-weight:100;">' + cargoInfoLite.Volume + ' ' + cargoInfoLite.MeasureVolume + ' c/u</label><div> ' + imagePacking + '<span>' + imageClassImo + '</span> </div></div>';
    cargoItem.item = cargoInfoLite;
    return cargoItem;
}
class CargoInfoLite {
}
