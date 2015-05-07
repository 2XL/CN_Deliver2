"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// ADAPTER

var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
window.saveAs = window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs;
var BrowserSupportedMimeTypes = {
    "image/jpeg": true,
    "image/png": true,
    "image/gif": true,
    "image/svg+xml": true,
    "image/bmp": true,
    "image/x-windows-bmp": true,
    "image/webp": true,
    "audio/wav": true,
    "audio/mpeg": true,
    "audio/webm": true,
    "audio/ogg": true,
    "video/mpeg": true,
    "video/webm": true,
    "video/ogg": true,
    "text/plain": true,
    "text/html": true,
    "text/xml": true,
    "application/xhtml+xml": true,
    "application/json": true
};
function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}

function createRadioElement(name, checked) {
    var radioHtml = '<input type="radio" name="' + name + '"';
    if (checked) {
	radioHtml += ' checked="checked"';
    }
    radioHtml += '/>';
    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;
    return radioFragment.firstChild;
}

function cleanArray(arr) {
    return arr.filter(function (n) {
	return n !== undefined;
    });
}



function stackToJSON(stack) {
    var jsonStack;
    var size = stack.length;
    // declarar skeleton
    var jsonStack = {
	nodes: [],
	edges: []
    };
    var edgeIdx = 0;
    stack.forEach(function (item, idx, all) {

	var size = item.lenVertex();
	var node = {
	    id: "n" + item.id,
	    label: "l" + idx,
	    size: size  // 1 | vertex.length
	};
	jsonStack.nodes.push(node);
	var sourceId = "n" + item.id;
// por cada vertice del nodo añadir un edge en el json outputStack
//	console.log(item);


	for (var key in item.vertexIn) {
	    var node = item.vertexIn[key];
	    var targetId = "n" + node.id;
	    var edge = {
		id: String(edgeIdx++), // concatenar los offsets con espacios de relleno
		source: sourceId,
		target: targetId
	    };
	    jsonStack.edges.push(edge);
	}
	;
    });
    // omplir el stkeleton
    return jsonStack;
}

function indexOf(needle) {
    if (typeof Array.prototype.indexOf === 'function') {
	indexOf = Array.prototype.indexOf;
    } else {
	indexOf = function (needle) {
	    var i = -1, index = -1;
	    for (i = 0; i < this.length; i++) {
		if (this[i] === needle) {
		    index = i;
		    break;
		}
	    }
	    return index;
	};
    }

    return indexOf.call(this, needle);
}



/* 
 * Saving a file with FileSaver.js
 */

function downloadJSON(dataJSON, nameDownload) {
    var strJSON = JSON.stringify(dataJSON);
    var blob = new Blob([strJSON], {type: "application/json"});
    saveAs(blob, nameDownload);
    //saving json string to client pc using HTML5 API
    //var url = URL.createObjectURL(blob);
    //  window.open(url, "downloadJSON.json");

}



/*
 * Converting JSON to Pajek
 */

function JSON2Pajek(dataJSON, nameDownload) {

// json object is
    var json = {
	nodes: [
	    {
		id: "n#",
		label: "l#",
		size: "#"
	    }
	],
	edges: [
	    {
		id: "#",
		source: "n#",
		target: "n#"
	    }
	]
    };
    var pajekShape = ["box", "triangle", "diamond", "ellipse"]

    var stringBuffer = "";
    var verticesHead = "*Vertices " + dataJSON.nodes.length + "\n";
    var vertices = ""; // aixo nomes si vull afegir el pes
    for (var key in dataJSON.nodes) {
// console.log(data.nodes[key])
// this way or customize an toString 4 node class.
	vertices += parseInt((dataJSON.nodes[key].id).substr(1)) + 1 + " \"" + dataJSON.nodes[key].label + "\"\n";
// " + dataJSON.nodes[key].x + " " + dataJSON.nodes[key].y + " box\n";
// console.log(vertex)
    }
    var edgesHead = "*Edges\n";
    var edges = "";
    for (var key in dataJSON.edges) {
// console.log(data.nodes[key])
	edges += parseInt((dataJSON.edges[key].source).substr(1)) + 1 + " " + (parseInt((dataJSON.edges[key].target).substr(1)) + 1) + "\n";
	// console.log(edges);
    }

    stringBuffer = verticesHead + vertices + edgesHead + edges;
    var blob = new Blob([stringBuffer], {type: 'text/plain'});
    saveAs(blob, nameDownload);
}

function partitionToCluster(dataJSON, nameDownload) {
  /*  var dataJSON = {
	"0": 0,
	"1": 0,
	"2": 1,
	"3": 1,
	"4": 2,
	"5": 3, "6": 3, "7": 1, "8": 4, "9": 1, "10": 2, "11": 0, "12": 1, "13": 1, "14": 4, "15": 4, "16": 3, "17": 0, "18": 4, "19": 0, "20": 4, "21": 0, "22": 4, "23": 5, "24": 5, "25": 5, "26": 4, "27": 5, "28": 5, "29": 4, "30": 4, "31": 5, "32": 4, "33": 4}
*/
    var stringBuffer = "";
    var verticesHead = "*Vertices " + Object.keys(dataJSON).length + "\n";
    var vertices = ""; // aixo nomes si vull afegir el pes
    for (var key in dataJSON) {
// console.log(data.nodes[key])
	vertices += (dataJSON[key]+1)+  "\n";
	// console.log(edges);
    }
    stringBuffer = verticesHead + vertices;
    var blob = new Blob([stringBuffer], {type: 'text/plain'});
    saveAs(blob, nameDownload);
    
}
// var str = JSON.stringify(obj, null, 2); // spacing level = 2

function syntaxHighlight(json) {
    if (typeof json != 'string') {
	json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
	var cls = 'number';
	if (/^"/.test(match)) {
	    if (/:$/.test(match)) {
		cls = 'key';
	    } else {
		cls = 'string';
	    }
	} else if (/true|false/.test(match)) {
	    cls = 'boolean';
	} else if (/null/.test(match)) {
	    cls = 'null';
	}
	return '<span class="' + cls + '">' + match + '</span>';
    });
}