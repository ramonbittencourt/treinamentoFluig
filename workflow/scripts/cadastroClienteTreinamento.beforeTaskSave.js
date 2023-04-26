function beforeTaskSave(colleagueId,nextSequenceId,userList){
	//MONTA CONEXÂO COM O BANCO DE DADOS
	var newDataset = DatasetBuilder.newDataset();
    var dataSource = "java:/jdbc/Teste";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var conn = ds.getConnection();
    
    var codCliente = hAPI.getCardValue("codCliente");
	var nomeCliente = hAPI.getCardValue("nomeCliente");
	var statusCliente = hAPI.getCardValue("statusCliente");
	var cepCliente = hAPI.getCardValue("cepCliente");
	var enderecoCliente = hAPI.getCardValue("enderecoCliente");
	var bairroCliente = hAPI.getCardValue("bairroCliente");
	var cidadeCliente = hAPI.getCardValue("cidadeCliente");
	var estadoCliente = hAPI.getCardValue("estadoCliente");
    
    // GRAVA REGISTRO
	var SQL_CLIENTE = "INSERT INTO clientes " +
					"(NOME, ENDERECO, BAIRRO, CIDADE, ESTADO, STATUS, CEP) " +
							" VALUES ('" + nomeCliente + "', '" + enderecoCliente + "', '" + bairroCliente + "', '" + cidadeCliente + "', '" + estadoCliente + "', '" + statusCliente + "', '" + cepCliente + "')";		
	
	
	log.info("SQL INSERT CLIENTE: " + SQL_CLIENTE);
	var statemGravacao = conn.prepareStatement(SQL_CLIENTE);
	var rsWD1 = statemGravacao.executeUpdate();
	
	//FECHA CONEXÂO COM O BANCO DE DADOS
	if (conn != null) {
        conn.close();
    }
	if(statemGravacao != null){
		statemGravacao.close();
	}
	
	log.info("FIM GRAVAÇÃO ZBM ");
}