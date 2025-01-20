// This script grabs the appropriate language files. #es at end of URL for spanish,
//	otherwise english will display
//
// Version History
//
//	aaron krupp 19-Jun-2018	first version adopted from caminosdeagua.github.io/project-map repo

var head = document.getElementsByTagName('head')[0];
var js = document.createElement("script");
var post_hash = location.href.split("#")[1];
js.type = "text/javascript";

if (post_hash == "es") {
	js.src = "text/display_Spanish.js";
	//$('head').append('<link rel="stylesheet" type="text/css" href="styles/map_styles_English.css">');
} else {
	js.src = "text/display_English.js";
	//$('head').append('<link rel="stylesheet" type="text/css" href="styles/map_styles_English.css">');
}

head.appendChild(js);
