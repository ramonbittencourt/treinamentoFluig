function displayFields(form,customHTML){
	log.info("INICIO DISPLAYFIELDS CADASTRO CLIENTE ");
	var formMode = form.getFormMode();
	
	if(formMode == "ADD"){
		//MONTA CONEXÂO COM O BANCO DE DADOS
		var newDataset = DatasetBuilder.newDataset();
	    var dataSource = "java:/jdbc/Teste";
	    var ic = new javax.naming.InitialContext();
	    var ds = ic.lookup(dataSource);
	    var conn = ds.getConnection();
	    
	    // BUSCA O ID PARA PODER CARREGAR EM TELA O ULTIMO ID
		var novoCodigo = "SELECT CASE WHEN MAX(ID) IS NULL THEN '1' ELSE MAX(ID)+1 END as new_codigo FROM clientes";
		var statementNewCod = conn.prepareStatement(novoCodigo);
		var rsNewCod = statementNewCod.executeQuery();
		while(rsNewCod.next()){
			var novoCodigo = rsNewCod.getString("new_codigo");
			log.info("NOVO CÓDIGO "+novoCodigo);
			form.setValue("codCliente",novoCodigo);
		}
		if (rsNewCod != null){
			rsNewCod.close();
		}
		if (statementNewCod != null){
			statementNewCod.close();
		}
	}

	log.info("FIM DISPLAYFIELDS CADASTRO CLIENTE ");
}