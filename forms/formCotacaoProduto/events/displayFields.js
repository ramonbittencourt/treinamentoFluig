function displayFields(form,customHTML){
	
	var activity = getValue('WKNumState');
	
	customHTML.append("<script>function getWKNumState(){ return " + activity + ";}</script>");
	
	if (activity == 0 || activity == 4) {
		customHTML.append("<script>$('#aprovacaoCliente').hide();</script>");
		customHTML.append("<script>$('.divCustos').hide();</script>");
		customHTML.append("<script>wdkAddChild('tbItens');</script>");
		customHTML.append("<script>$('#codItem___1').attr('disabled',true);</script>");
		customHTML.append("<script>$('#valorItem___1').attr('disabled',true);</script>");	
	}	
	
	
	if (activity == 5 ) {
	
		form.setHideDeleteButton(true);
		
		customHTML.append("<script>$('#addActivityButton').hide();</script>");
		
		customHTML.append("<script>$('#aprovacaoCliente').hide();</script>");
	}
	
	
	if (activity == 9) {
		customHTML.append('<script>$("#btnRmvAnexoCotacao").attr("onclick",null);</script>');
		customHTML.append('<script>$("#btnAnexoCotacao").attr("onclick",null);</script>');
		customHTML.append("<script>$('#btnRmvAnexoCotacao').attr('disabled',true);</script>");
		customHTML.append("<script>$('#btnAnexoCotacao').attr('disabled',true);</script>");
		
		form.setHideDeleteButton(false);
		
		customHTML.append("<script>$('#addActivityButton').show();</script>");			
				
	}
	
	if (activity == 16 || activity == 14) {		
		customHTML.append("<script> $('#addActivityButton').hide();</script>");			
	}

}