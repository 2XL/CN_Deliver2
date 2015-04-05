/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("script Loaded!");

function pajekToJSON(str) {

    console.log({data: str});
    var list = str.split("\n");

    var json = {};
    var section = "";

    var patt = /^[0-9]/; // start with a number
    for (var key in list) {
	if (list[key].trim().search(patt) !== -1) {
	    // console.log(list[key])
	    var line = list[key].match(/\S+/g);
	    switch (section) {
		case "Vertices":
		    json[section].push(parseInt(line[0])-1); // offset -1 xk incia amb 0
		    break;
		case "Edges":
		    var edge = {
			source: parseInt(line[0])-1,// offset -1 xk incia amb 0
			target: parseInt(line[1])-1,
			weight: parseInt(line[2])
		    };
		    json[section].push(edge);
		//    console.log(edge);
		    break;
		default :
		    console.log("unhandled: " + section);
		    break;
	    }
	} else {
		// console.info({data: list[key]});
	    if ( list[key] !== "") {
		section = list[key].match(/[A-z]+/)[0];
		console.log({data: section});
		console.log(json);
		json[section] = [];
	    }

	}
    }



// dir is the path of the file.net


return json;

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


function loadNET(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/plain");
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
 