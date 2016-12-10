package com.cal;

import javax.jws.WebService;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

@WebService
public class Calculate 
{
	public String calculate(String statement){
		System.out.println("Request: " + statement);
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("js");
		Object result = "";
		try {
			result = engine.eval(statement);
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			return result.toString();
	}

}
