//Version 2
function getCargoInfoItem(id, propertiesFreight, linerTerm, description, packing, length, height, width, measureDimentions, imoClass, volume, measureVolume, weight, measureWeight, quantity) {
    var cargoItem = {};
    var imagePacking = ' <img alt="" src="' + packing.find(':selected').attr('data-urlimage') + '" style="margin-right:16px; width: 64px; float: left; height: 64px;" /> ';
    var imageClassImo = '';
    if (imoClass.val() != undefined && imoClass.val() != '') {
        imageClassImo = '<img alt="" src="' + imoClass.find(':selected').attr('data-urlimage') + '" style="width: 64px; height: 64px; float: left;" />';
    }
    cargoItem['id'] = 'CargoInfo' + id;
    cargoItem['html'] = '<div id="' + cargoItem['id'] + '" class="panel-body col-md-4 item-cargo-info"><hidden id="Hdn' + cargoItem['id'] + '"></hidden><label style="font-size:22px; font-family:arial,helvetica,sans-serif;">' + propertiesFreight.find(':selected').text() + '&nbsp;<em><span style="font-size:12px;"><span style="font-family:arial,helvetica,sans-serif; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; line-height: 16px; max-height: 32px; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">' + linerTerm.find(':selected').text() + '</span> </span> </em> </label> <label style="font-family:arial,helvetica,sans-serif; font-size:14px; font-weight:100; margin-bottom:16px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; line-height: 16px; max-height: 32px; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">' + description + '</label> <div>' + imagePacking + '<span style="font-size:12px;"> <span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' + length + ' x ' + height + ' x ' + width + ' ' + measureDimentions.find(':selected').text() + ' ' + imageClassImo + '</span> </span> </div> <div> <span style="font-size:12px;"><span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' + volume + ' ' + measureVolume.find(':selected').text() + '<sup>3</sup></span> </span> </div> <div> <span style="font-size:12px;"><span style="font-family:arial,helvetica,sans-serif; margin-left:16px;">' + weight + ' ' + measureWeight.find(':selected').text() + '</span> </span> </div> </div>';
    var piece = {};
    piece["Id"] = id;
    piece["CargoDescription"] = description;
    piece["PropertiesFreightId"] = propertiesFreight.val();
    piece["ImoId"] = imoClass.val();
    piece["PackingId"] = packing.val();
    piece["LinerTermId"] = linerTerm.val();
    piece["MeasurementUDimensionsId"] = measureDimentions.val();
    piece["Length"] = length;
    piece["Width"] = width;
    piece["Height"] = height;
    piece["MeasurementUWeightId"] = measureWeight.val();
    piece["Weight"] = weight;
    piece["MeasurementUVolumeId"] = measureVolume.val();
    piece["Volume"] = volume;
    piece["Quantity"] = quantity;
    cargoItem['cargo'] = piece;
    return cargoItem;
}
