function addProduto() {
	row = wdkAddChild('tbItens');
	MaskEvent.init();
	//BLOQUEANDO CAMPOS AO ADICIONAR LINHAS
	$('#codItem___'+row).attr('disabled',true);
	$('#valorItem___'+row).attr('disabled',true);
}

//FUNÇÃO AO SELECIONAR ALGUMA OPÇÃO DE QUALQUER CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {
	if(selectedItem.inputId == "nomeCliente"){
    	$("#codCliente").val(selectedItem.ID);
    }
}