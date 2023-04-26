function addProduto() {
	row = wdkAddChild('tbItens');
	MaskEvent.init();
	//BLOQUEANDO CAMPOS AO ADICIONAR LINHAS
	$('#codItem___'+row).attr('disabled',true);
	$('#valorItem___'+row).attr('disabled',true);
}
	
function itemremove(oElement){
   	fnWdkRemoveChild(oElement);
}