/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function pajekToJSON(dir) {
    var json;

    // dir is the path of the file.net




    // format
    // param -> values


}

// haha aixo o Jquery en una linea...
function loadJSON(path, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
	if (xobj.readyState === 4 && xobj.status === 200) {
// .open will NOT return a value but simply returns undefined in async mode so use a callback
	    callback(xobj.responseText);
	}
    }
    xobj.send(null);
}

function isJson(str) {
    try {
	var data = JSON.parse(str);
    } catch (e) {
	return {json: false, data: str};
    }
    return {json: true, data: data};
}
 