function defineStructure() {
	addColumn("ID");
	addColumn("NOME");
	addColumn("ENDERECO");
	addColumn("BAIRRO");
	addColumn("CIDADE");
	addColumn("ESTADO");
	addColumn("STATUS");
	
	setKey([ "ID" ]);
}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	log.info("#### Dataset dsBuscaClienteTreinamento ####");
	
	var newDataset = DatasetBuilder.newDataset();
	var dataSource = "java:/jdbc/Teste";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
    
	var ID = "";
	var NOME = "";

	if (constraints != null) {			
       for (var i = 0; i < constraints.length; i++) {
	       if ( constraints[i].getFieldName().toString() == 'ID' ) {
	    	   ID = constraints[i].initialValue;
	       }
	       if ( constraints[i].getFieldName().toString() == 'NOME' ) {
	    	   NOME = constraints[i].initialValue;
	       }

       }
	}
	
	log.info("IDDDD "+ID);
	log.info("NOMEEEE "+NOME);
	
	var cQuery = "SELECT ID, NOME, ENDERECO, BAIRRO, CIDADE, ESTADO, STATUS FROM clientes WHERE STATUS = 'A'";
	
	if(ID != ""){
		cQuery += " AND ID = "+ID+"";
	}
	
	if(NOME != ""){
		cQuery += " AND (NOME LIKE ('%"+NOME+"%') OR ID LIKE ('%"+NOME+"%'))";
	}

    log.info("QUERYY CLIENTE: " + cQuery);
    
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(cQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    log.info("FIM DATASET - dsBuscaClienteTreinamento");

    return newDataset;
	

}function onMobileSync(user) {
	var sortingFields = new Array();
    var constraints = new Array();	    
    
    var colunastitulo = new Array('ID','NOME','ENDERECO','BAIRRO','CIDADE','ESTADO','STATUS');      
    var result = {
        'fields' : colunastitulo,
        'constraints' : constraints,
        'sortingFields' : sortingFields
    };
    return result;
}