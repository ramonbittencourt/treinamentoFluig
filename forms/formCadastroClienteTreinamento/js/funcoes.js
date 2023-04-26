function buscaCep(){
	var cep = $("#cepCliente").val().replace(/[^\d,]/g, '');
	if (cep != "") {
		var validacep = /^[0-9]{8}$/;
		if(validacep.test(cep)) {
			var url = "https://viacep.com.br/ws/"+ cep +"/json"
			$.ajax({
				type: "GET",
		    	dataType: "json",
		    	url: url,
		    	data: "",
		    	timeout: 3000,
		    	error: function(XMLHttpRequest, textStatus, errorThrown) {
	               	FLUIGC.toast({ title: 'Atenção: ',message: 'CEP pesquisado não foi encontrado' , type: 'warning' });
	               	$("#enderecoCliente").val("");
					$("#bairroCliente").val("");
					$("#cidadeCliente").val("");
					$("#estadoCliente").val("");
				},
				success: function (data, status, xhr) {
					if (data.erro) {
						FLUIGC.toast({ title: 'Atenção: ',message: 'CEP pesquisado não foi encontrado' , type: 'warning' });
		               	$("#enderecoCliente").val("");
						$("#bairroCliente").val("");
						$("#cidadeCliente").val("");
						$("#estadoCliente").val("");
	    	    	}else{
	    	    		$("#enderecoCliente").val(data.logradouro);
		                $("#bairroCliente").val(data.bairro);
		                $("#cidadeCliente").val(data.localidade);
		                $("#estadoCliente").val(data.uf);
	    	    	}
				}
			});
		}else{
			//cep é inválido.
			$("#enderecoCliente").val("");
			$("#bairroCliente").val("");
			$("#cidadeCliente").val("");
			$("#estadoCliente").val("");
	        FLUIGC.toast({ title: 'Atenção: ',message: 'Formato de CEP inválido.' , type: 'warning' });
		}
	} else {
	   	$("#enderecoCliente").val("");
		$("#bairroCliente").val("");
		$("#cidadeCliente").val("");
		$("#estadoCliente").val("");
	}
}