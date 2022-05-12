////////////////////////////////////////////////////////////////////////////////
////				Stuff to be Translated 									////
////	The stuff in the next section is all of the text that appears at 	////
////	any point on the map. It's stored in simple strings for ease of 	////
////	translation. Enjoy =)												////
////////////////////////////////////////////////////////////////////////////////
var TITLE = "Cuenca de la Indepencia Mapa de Nivel de Peligro del Agua | Caminos de Agua"; 
var MONTHS = ["Ene", "Feb", "Mar", 		// Array of names of months for displaying
			"Abr", "May", "Jun", 			//	the date in an accessible, clear format,
			"Jul", "Ago", "Sep", 		// 	even for silly US people who choose to put 
			"Oct", "Nov", "Dic"];	

var CONTAMINANTS = ["Fluoruro", "Arsénico", "Nivel de peligro total"]; 	
											// Array with list of contaminants in same order
											// 	such that CONTAMINANTS[FLUORIDE] = "Fluoride"
											//	(since FLUORIDE == 0 above...)
var DATA_NAMES = {							// And store the titles of the columns 							
	date: "date",
	name: "name",
	site_type: "tipo_del_sitio",
	lat: "latitude",
	lng: "longitude",
	f: "fluoride",
	forg: "fluoride_testing_org",
	fmethod: "fluoride_testing_method",
	as: "arsenic",
	asorg: "arsenic_testing_org",
	asmethod: "arsenic_testing_method",
	docs: "document_link",
	test_org: "GENERAL_TESTING_ORG"
};		

var DATE = "Fecha";
var TEST_ORG = "Institución";
var SEE_MORE = "Reporte(s) Oficial(es)";	// This message gets displayed as a link to show 
											//	more info about the given datapoint
var ATTRIBUTION = 'Mapa por <a href="http://www.mapbox.com">Mapbox</a> con datos de <a href="https://www.openstreetmap.org">OSM</a> | Almacenamiento de datos con <a href="http://drive.google.com">Google Sheets</a> | Leyendas por <a href="http://www.carto.com">Carto</a> | <a href="https://caminosdeagua.org/en/donate">Donar</a>';

var NO_DATA_MSG = "";

var F_LABELS = ["0-1.5", "1.5-3", "3-10", "10+"];
var AS_LABELS = ["0-10","10-25","25+"];
var RISK_LABELS = ["\xa0\xa0\xa0Cumple\xa0con\xa0todas\xa0las\xa0normas",
"\xa0\xa0\xa0No\xa0es\xa0seguro\xa0para\xa0los\xa0niños\xa0menores\xa0de\xa0siete\xa0años",
"\xa0\xa0\xa0Peligroso\xa0si\xa0se\xa0toma\xa0regularmente",
"\xa0\xa0\xa0Potencialmente\xa0tóxica!"];
var LABELS = [F_LABELS, AS_LABELS];

var F_TITLE = "Fluoruro (mg/L): Límite de OMS = 1.5; Límite Mexicano = 1.5";
var AS_TITLE = "Arsénico (&mu;g/L): Límite de OMS = 10; Límite Mexicano = 25"; 
var RISK_TITLE = "<big>Nivel de peligro total</big><br>Limites de OMS: Fluoruro = 1.5 mg/L; Arsénico = 10 &mu;g/L";

var OLD_DATA_MSG = "<em>\xa0\xa0\xa0\xa0\xa0\xa0DATOS ANTERIORES</em><br>";

var HOW2READ_URL = "img/howToRead_ESP.png";	//WILL EVENTUALLY BE: "https://caminosdeagua.github.io/cuenca-de-la-independencia-punto-mapa-espanol/img/howToRead_ESP.png";

var PRINTING_SUMMARY_MSG = "\n-----***-----***-----***-----***-----***-----***-----\nGreat job, you hacker you! Enjoy the summary...\n-----***-----***-----***-----***-----***-----***-----\n "
var TOTAL_SITES_MSG = "Distinct sites (wells, taps, pipa, etc.) sampled at least once:";
var TOTAL_WELLS_MSG = "Distinct wells sampled at least once:";
var TOTAL_POINTS_MSG = "Total number of datapoints collected (includes duplicates for single site):";
var TOTAL_ORGS_MSG = "Number of testing organizations:";
var ORG_NAMES_MSG = "All testing organizations:";
var CONTAMINANT_HEADER_MSG = "----------------";	
var CONTAM_LIMIT_MSG = "Number of locations whose most recently sampled point is";	
var TOTAL_ABOVE_MSG = "All sites above the WHO limit:";
var TOTAL_ABOVE_BOTH_MSG = "All sites above the WHO limit for both As & F:";
var BOTH_MSG = "Arsenic & Fluoride";

var SEARCH_HELPER_TEXT = "Busca...";
var NO_RESULTS_MSG = "Ya no hay nada";

var SATELLITE_MAP_VIEW = "Satélite";
var BASIC_MAP_VIEW = "Mapa";

var DISPLAY_TITLE = "<b>Mapa de Calidad de Agua</b>";
var DISPLAY_MSG = "Haz clic para explorar";

var DATE_MESSAGE = "Fecha";
var WATER_SOURCE_MESSAGE = "Tipo";
var F_UNITS = "mg/L";
var AS_UNITS = "&mu;g/L";
var TESTED_BY = "Probado por: ";

var LEGEND_RISK_URL = "img/legend_risk_ESP.png"
var LEGEND_F_URL = "img/legend_f_ESP.png"
var LEGEND_AS_URL = "img/legend_as_ESP.png"
