
$(document).ready(function() {
	setTimeout(function() {
		formCotacao.start();
	}, 100)
});


//** funcao de apoio para funcoes de calculo e index
var formCotacao = (function() {
	var today = new Date();
	var current = null;
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {//inicia processo

			events.setup();

		}
	}
})();


var events = (function() {
	var cotacao = "";
	return {
		setup : function() {
			$(document).on("click", ".zoom-click", function() {
				var ev = $(this).data("event");
			    zooms(ev);
			});
		}
	}
})();



//FUNCAO PARA SABER O SISTEMA OPERACIONAL MOBILE 
function retornaSO() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    } else if (/android/i.test(userAgent)) {
        return "Android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    } else {
        return "unknown";
    }                
}


function zooms(ev){

		//SE FOR IOS OU PC ELE EXECUTARA ZOOMMODAL USANDO #AJAX API FLUIG 
		//SE FOR ANDROID ELE USARA ZOOMMODAL VIA DATASETFATORY 
		//MOTIVO : PARA FUNCIONAMENTO DE OFFLINE EM SO ANDORID... 
		//if(retornaSO() != 'Android') {
			
			if ( ev ==  'cliente' ) {
				if(getWKNumState() == 0 || getWKNumState() == 4){	
					//function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby)
					modalzoom.open("dsBuscaClienteTreinamento", "NOME,Nome Cliente,ID,Código", "NOME,ID", "Zoom Cliente", '' , 'cliente' , "" , "", "" );
				}
			}
			
}

//MODAL NORMAL AJAX VIA API REST - ASSINCRONO 
var modalzoom = (function(){
	var zoommodal = null;
	var loading = parent.FLUIGC.loading(parent);
	return {
		open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {

			//console.log(likefield)
			console.log(filters)
			loading.show();

			var showfields = [];
			var globaldataset = [];
			var current = 0;
			var tipo = type ;

			var tamModal = "large";


			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;

				parent.$(".table-zoom > thead").html("");
				parent.$(".table-zoom > tbody").html("");
			}

			var html = "<body class='fluig-style-guide'>" +
				    "<div class='input-group'>" +
				    "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" +
				    "<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" +
				    "</div>" +
				    "<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
				    "<table class='table table-hover table-zoom'>" +
				    "<thead>" +
				    "</thead>" +
				    "<tbody>" +
				    "</tbody>" +
				    "</table>" +
				    "</div>" +
				    "</body>";


			var zoommodal = parent.FLUIGC.modal({
			    title: title,
			    content: html,
			    formModal: false,
			    size: tamModal ,//"large",
			    id: 'modal-zoom-' + type,
			    actions: [{
			        'label': 'Selecionar',
			        'classType': 'btn-success zoom-selected',
			        'autoClose': true,
			    },{
			        'label': 'Fechar',
			        'autoClose': true
			    }]
			}, function(err, data) {
			    if(err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
					loading.hide();
			    } else {
					var trimarray = function (fields) {
				    	for(var i=0; i < fields.length; i++){
				    		fields[i] = fields[i].trim();
				    	}
				    	return fields;
				    }

					var urlrequest = function(){
					    var request = "/ecm/api/rest/ecm/dataset/",
					        json = {};

					    if (dataset != null) {
					        request += "getDatasetZoom";
					        json.datasetId = dataset;
					    } else if(cardDatasetId != null){
					        request += "getCardDatasetValues";
					        json.cardDatasetId = cardDatasetId;
					    }

					    if (resultfields != null && resultfields.length > 0 ){
					    	json.resultFields = trimarray(resultfields.split(","));
					    }

					    if (filters != null && filters.length > 0 ){
					        json.filterFields = trimarray(filters.split(","));
					    }

					    if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
					        json.likeField = likefield;
					        json.likeValue = likevalue;
					    }

					    var searchValue = parent.$("#search").val();
					    if(searchValue && searchValue.length > 0) {
					    	json.searchValue = searchValue;

					    	if (searchby && searchby != "") {
						        json.searchField = searchby;
					    	} else {
					    		json.searchField =  fields.split(",")[0];
					    	}

					    }

					    return request +="?json=" + encodeURI(JSON.stringify(json));
					};

					var searchtable = function (text) {
						var table = parent.$('.table-zoom > tbody');
						table.find('tr').each(function(index, row) {
							var allCells = $(row).find('td');
							if(allCells.length > 0) {
								var found = false;
								allCells.each(function(index, td) {
									var regExp = new RegExp(text, 'i');
									if(regExp.test($(td).text())) {
										found = true;
										return false;
									}
								});
								if(found == true)$(row).show();else $(row).hide();
							}
						});
					}

					var setup = function(lista) {
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
						parent.$(".table-zoom > thead").append(html);
					}

					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							var html = "<tr data-dataset=" + i + ">";
							for (var x=0; x<showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";

							}
							html += "</tr>";
							parent.$(".table-zoom > tbody").append(html);
						}
						parent.$(".table-zoom > tbody > tr").click(function() {
							parent.$(".table-zoom > tbody > tr").removeClass("active");
				 			$(this).addClass("active");
				 			current = $(this).data("dataset");
				 		});
						parent.$(".table-zoom > tbody > tr").dblclick(function() {
				 			var row = globaldataset[$(this).data("dataset")];
				 			row["type"] = type;
				 			setSelectedZoomItem(row);
				 			zoommodal.remove();
				 		});

				 		loading.hide();
					}

					var dosearch = function() {
				 		var url = urlrequest();
				 		parent.$(".table-zoom > tbody").html("");

						console.log("url", url)

				 		loading.show();

						$.ajax({
				    		type: "GET",
				    		dataType: "json",
				    		url: url,
				    		data: "",
				    		error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
				    	    	FLUIGC.toast({
						    		title: '',
						    		message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!' ,
						    		type: 'danger'
						    	});
				    	    	loading.hide();
							},
				    	    success: function (data, status, xhr) {
				    	    	console.log("dataset sucess", data, status, xhr)
				    	    	var dataset = data["invdata"];
				    	    	readydataset(dataset);
				    	    }
						});
					}

					var timeout;
					var isIE = false || !!document.documentMode;
					var timeoutSearch = 500;
					parent.$('#search').keyup(function(e) {
						clearTimeout(timeout);
						var keycode;
						if (window.event) {
							keycode = window.event.keyCode;
						}
						else if (e) {
							keycode = e.which;
						}
						else {
							return true;
						}
						console.log("search", keycode);
							  
				   
				  
						timeout = setTimeout(dosearch, timeoutSearch);
		   
					});
					
					parent.$('#search').keydown(function(e) {
						clearTimeout(timeout);
					});
					
					parent.$('.zoom-selected').click(function() {
			 			var row = globaldataset[current];
			 			row["type"] = type;
			 			setSelectedZoomItem(row);
					});

			 		setup(fields);
			 		dosearch();

			    }
			});

		}
	}
})();



//atribui o valor selecionado do zoom para o campo do formul�rio
function setSelectedZoomItem(selectedItem) {
	var tipo = selectedItem.type;

	if (tipo == "cliente" ) {
		$("#codCliente").val(selectedItem.ID);
		$("#nomeCliente").val(selectedItem.NOME);
	}

}


function modal( title , html) {
    var myModal = parent.FLUIGC.modal({
        title: title ,
        content: html,
        id: 'fluig-modal',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function(err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });
}