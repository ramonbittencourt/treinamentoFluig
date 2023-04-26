function validateForm(form){

	
	log.info("INICIO VALIDATEFORM CADASTRO CLIENTE ");
	var msgErro = "";
		
	if(form.getValue("codCliente") == "" || form.getValue("codCliente") == null){
		msgErro += "<li style='margin-bottom: 5px;'>Código do cliente não foi carregado. </li>";
	}
	if(form.getValue("nomeCliente") == "" || form.getValue("nomeCliente") == null){
		msgErro += "<li style='margin-bottom: 5px;'>Nome do cliente deve ser informado. </li>";
	}
	if(form.getValue("statusCliente") == "" || form.getValue("statusCliente") == null){
		msgErro += "<li style='margin-bottom: 5px;'>Status deve ser informado. </li>";
	}
	if(form.getValue("cepCliente") == "" || form.getValue("cepCliente") == null){
		msgErro += "<li style='margin-bottom: 5px;'>CEP deve ser informado. </li>";
	}
	if(form.getValue("enderecoCliente") == "" || form.getValue("enderecoCliente") == null){
		msgErro += "<li style='margin-bottom: 5px;'>Endereço deve ser informado. </li>";
	}
	if(form.getValue("bairroCliente") == "" || form.getValue("bairroCliente") == null){
		msgErro += "<li style='margin-bottom: 5px;'>Bairro deve ser informado. </li>";
	}
	if(form.getValue("cidadeCliente") == "" || form.getValue("cidadeCliente") == null){
		msgErro += "<li style='margin-bottom: 5px;'>Cidade deve ser informada. </li>";
	}
	if(form.getValue("estadoCliente") == "" || form.getValue("estadoCliente") == null){
		msgErro += "<li style='margin-bottom: 5px;'>Estado deve ser informado. </li>";
	}
	
	
	if(msgErro != ""){
    	throw "<br/><strong>Atenção:</strong> Favor informar os campos obrigatórios:<br/><br/><ul style='padding-left: 17px;color: red;list-style: disc;'>" + msgErro + "</ul><br/>";
    }
	log.info("FIM VALIDATEFORM CADASTRO CLIENTE ");
	

}