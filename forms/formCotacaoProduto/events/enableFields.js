function enableFields(form){ 
	var activity = getValue("WKNumState");
	
	if (activity == 0 || activity == 4) {
		form.setEnabled("codCotacao", false);
	}
	
	if (activity == 5 ) {
		form.setEnabled("nomeCliente", false);
		form.setEnabled("codCotacao", true);
		var indexes = form.getChildrenIndexes("tbItens");
	    for (var i = 0; i < indexes.length; i++) {   
	    	form.setEnabled("codItem___" + indexes[i], true);
	    	form.setEnabled("produtoItem___" + indexes[i], false);
	    	form.setEnabled("valorItem___" + indexes[i], true);
	    }  
		
		form.setEnabled("retornoCliente", false);
		form.setEnabled("obsCliente", false);
				
	}
	
	
	if (activity == 9) {
		form.setEnabled("nomeCliente", false);
		form.setEnabled("obsCotacao", false);
		form.setEnabled("codCotacao", false);
		
		var indexes = form.getChildrenIndexes("tbItens");
		for (var i = 0; i < indexes.length; i++) {   
			form.setEnabled("codItem___" + indexes[i], false);
			form.setEnabled("produtoItem___" + indexes[i], false);
			form.setEnabled("valorItem___" + indexes[i], false);
		}  		
				
	}
	
}