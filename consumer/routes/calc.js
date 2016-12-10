/**
 * http://usejsdoc.org/
 */
var ejs = require("ejs");
var soap = require('soap');
var baseURL = "http://localhost:8080/CalculatorServer/services";

function showCalc(req,res) {
	ejs.renderFile('./views/calc.ejs',function(err, result) {
	// render on success
	if (!err) {
	res.end(result);
	}
	// render or error
	else {
	res.end('An error occurred');
	console.log(err);
	}
	});
	}


function calculateIt(req,res){
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/Calculate?wsdl";
	  var args = {statement: req.param("eq")};
	  console.log("Request:"+req.param("eq"));
	  soap.createClient(url,option, function(err, client) {
	      client.calculate(args, function(err, result) {
	    	  console.log("Response from server:"+JSON.stringify(result));
	    	  if(err){
	    		  json_responses = {"statusCode" : 401};
	    			res.send(json_responses);
	    	  }
	    	  else{
	    		  json_responses = {"statusCode" : 200, "res" : result.calculateReturn};
	    			res.send(json_responses);
	    	  }
	      });
	  });
};


exports.showCalc=showCalc;
exports.calculateIt=calculateIt;