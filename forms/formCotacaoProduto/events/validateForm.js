function validateForm(form){
	
	var activity = getValue('WKNumState');
	var codCotacao = form.getValue('codCotacao');
	var msgErro = "";
	
	if (activity == 0  || activity == 4) {
		
		if ((form.getValue("nomeCliente") == null || form.getValue("nomeCliente") == "")) {
			msgErro += "<li style='margin-bottom: 5px;'>Favor Preencher o Campo Cliente. </li>" ;
		}	
		
		var indexes = form.getChildrenIndexes("tbItens");
		if(indexes.length != 0 ){
			
			var count = 0 ;
			for (var i = 0; i < indexes.length; i++) {   
				count = i + 1
				if(form.getValue("produtoItem___" + indexes[i]) == ""){
					msgErro +=  "<li style='margin-bottom: 5px;'> Produto Não Foi Informado na Linha: " + count +". </li>";
				}	  	
			}   
		}else{
			msgErro +=  "<li style='margin-bottom: 5px;'>Favor Informar Pelo Menos um Produto. </li>";
		}
		
	}
	
	if (activity == 5) {
		if ((form.getValue("codCotacao") == null || form.getValue("codCotacao") == "")) {
			msgErro += "<li style='margin-bottom: 5px;'>Favor Preencher o Campo Cotação. </li>" ;
		}	
		
		var indexes = form.getChildrenIndexes("tbItens");
		if(indexes.length != 0 ){
			
			var count = 0 ;
			for (var i = 0; i < indexes.length; i++) {   
				count = i + 1
				if(form.getValue("codItem___" + indexes[i]) == ""){
					msgErro += "<li style='margin-bottom: 5px;'>Código do Produto Não Foi Informado na Linha: " + count + ". </li>" ;
				}	  	
				if(form.getValue("valor_item___" + indexes[i]) == ""){
					msgErro += "<li style='margin-bottom: 5px;'>Valor do Produto Não Foi Informado na Linha: " + count + ". </li>";
				}	  	
			}   
		}
		
		var constraints = new Array();
		constraints.push(DatasetFactory.createConstraint("retornoCliente", "", "", ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint("codCotacao", codCotacao, codCotacao, ConstraintType.MUST));
		var dsCotacao = DatasetFactory.getDataset("DScotacaoProduto", null, constraints, null);

		
		var cont = dsCotacao.rowsCount;
		var retornoCliente = form.getValue("retornoCliente");
		//SE TROUXER MAIS DE 1 O COTAÇÃO JÁ ESTÁ SENDO USADA
		if(cont >= 1){
			if(retornoCliente != "C"){
				msgErro += "<li style='margin-bottom: 5px;'>Já Existe uma Cotação com esse Código, Favor Verificar!<br/> - Alterar Código da Cotação e dos Produtos. </li>";	
			}
		}		
		
	}
	
	if (activity == 9) {
		
		var indexes = form.getChildrenIndexes("tbItens");
		if(indexes.length != 0 ){
			
			var count = 0 ;
			for (var i = 0; i < indexes.length; i++) {   
				count = i + 1
				if(form.getValue("produtoItem___" + indexes[i]) == ""){
					msgErro +=  "<li style='margin-bottom: 5px;'>Nome do Produto Não Foi Informado na Linha: " + count +". </li>";
				}
				if((form.getValue("codItem___" + indexes[i]) == "" || form.getValue("codItem___" + indexes[i]) == null) && form.getValue("retornoCliente") == "S"){
					msgErro += "<li style='margin-bottom: 5px;'>Código do Produto Não Foi Informado na Linha: " + count + ".Portanto Não Pode Ser Aprovado.<br/> - Solicite uma Nova Cotação ou Reprove o Pedido. </li>" ;
				}	  	  	
			}   
		}else if(form.getValue("retornoCliente") == "S" || form.getValue("retornoCliente") == "C"){
			msgErro +=  "<li style='margin-bottom: 5px;'>Favor Informar Pelo Menos um Produto. </li>";
		}
		
	}
	
	if(msgErro != null && msgErro != ""){
		throw "<br/><strong>Atenção:</strong> Favor informar os campos obrigatórios:<br/><br/><ul style='padding-left: 17px;color: red;list-style: disc;'>" + msgErro + "</ul><br/>";
	}
	
}