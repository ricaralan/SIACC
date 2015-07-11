/**
*  AbstractModel.js
*
*  @author Alan Olivares
*  @version 0.0.1
*/

var connection = require("../../connection/mysql_connection");
var self;
var AbstractModel = function () {
  self = this;
};

AbstractModel.prototype.tableStructure = {};

AbstractModel.prototype.getDescriptionTable = function (table, callback) {
  connection.query("describe " + table, function (err, attributes) {
    json = {};
    for (pos in attributes) {
      json[attributes[pos].Field] = {type:attributes[pos].Type};
    }
    callback(json);
  });
};

AbstractModel.prototype.select = function(table, jsonKeys, jsonWhere, callback) {
  self.getDescriptionTable(table, function(json){
    self.tableStructure = json;
    try {
      jsonwhere = self.getJsonDataSelect(jsonWhere);
      query = "SELECT " + jsonKeys + " FROM " + table;
      if (jsonwhere.arrayValues.length > 0){
        query += " WHERE " + jsonwhere.value;
        connection.query(query, jsonwhere.arrayValues, callback);
      } else {
        connection.query(query, callback);
      }
    } catch (e) {
      callback({message:"A field not found"}, null);
    }
  });
};

AbstractModel.prototype.getJsonDataSelect = function (jsonKeysValues) {
  var value = "", arrayValues = [];
  cont = 0, i = 0;
  for (key in jsonKeysValues) {
    if (cont != 0) {
      value += " AND ";
    }
    value += key + "=?";
    arrayValues[i++] = jsonKeysValues[key];
    cont++;
  }
  return {
    value : value,
    arrayValues : arrayValues
  };
};

AbstractModel.prototype.insert = function (table, jsonData, callback) {
  self.getDescriptionTable(table, function(json){
    self.tableStructure = json;
    try {
      json = self.getDataJsonInsert(jsonData);
      connection.query("INSERT INTO "+table+""+ json.keys +" VALUES " + json.signos, json.values, callback);
    } catch (e) {
      callback({message:"A field not found"}, null);
    }
  });
};

AbstractModel.prototype.update = function (table, jsonData, jsonIds, callback) {
  self.getDescriptionTable(table, function(json){
    self.tableStructure = json;
    try {
      json  = self.getDataJsonUpdate(jsonData, jsonIds);
      query = "UPDATE " + table + json.sets + json.whereids;
      connection.query(query, json.arrays, callback);
    } catch (e) {
      callback({message:"A field not found"}, null);
    }
  });
};

AbstractModel.prototype.delete = function (table, jsonIds, callback) {
  json = self.getKeyValueJson("AND", jsonIds);
  query = "DELETE FROM " + table +  " WHERE "+ json.keys ;
  console.log(query);
  connection.query(query, json.arrayValues, callback);
};

AbstractModel.prototype.getDataJsonUpdate = function (jsonData, jsonIds) {
  sets = " SET ", whereids = " WHERE ";
  cont = 0, i = 0;
  json1 = self.getKeyValueJson(",", jsonData);
  sets += json1.keys;
  json2 = self.getKeyValueJson(",", jsonIds);
  whereids += json2.keys;
  return {
    sets      : sets,
    whereids  : whereids,
    arrays    : getJoinJsons(json1.arrayValues, json2.arrayValues)
  };
};

function getJoinJsons(json1, json2){
	json = [];
	mergeJson(json, json1);
	mergeJson(json, json2);
	return json
}

function mergeJson(jsonTemp, json){
  var i = jsonTemp.length;
	for (key in json){
    jsonTemp[i++] = json[key];
  }
}

AbstractModel.prototype.getKeyValueJson = function (separator, jsonData) {
  keys = "";
  array = [];
  cont = 0, i = 0;
  for (key in jsonData) {
    if (self.existDataType(key)){
      if (cont != 0){
        keys += " " + separator + " ";
      }
      keys +=  key + "=?";
      array[i++] = jsonData[key];
    }
    cont++;
  }
  return {
    keys : keys,
    arrayValues : array
  };
};

AbstractModel.prototype.getDataJsonInsert = function (jsonData) {
  keys = "", signos = "", values = [];
  cont = 0, i = 0;
  for (key in jsonData){
    if (self.existDataType(key)){
      if (cont != 0){
        keys   += ",";
        signos += ",";
      }
      keys += key;
      signos += "?";
      values[i++] =  jsonData[key];
    }
    cont ++;
  }
  return {
    keys   : "(" + keys   + ")",
    signos : "(" + signos + ")",
    values : values
  };
};

AbstractModel.prototype.existDataType = function (key) {
  return self.tableStructure != null;
};

AbstractModel.prototype.getCorrectTypeValue = function (key, value){
  if (self.tableStructure[key].type.indexOf("varchar") != 0 && self.tableStructure[key].type.indexOf("date") != 0) {
    return value;
  }
  return "'"+value+"'";
};

/*
new AbstractModel().select("usuario",[
  "nombreUsuario", "passwordUsuario"
],{}, function (err, data){
  console.log(data);
});
new AbstractModel().update("user", {
  user_name : "Alan",
  user_password : "secret2"
}, {
  user_id : 1
}, function (err, data){
  console.log(err);
  console.log(data);
});

new AbstractModel().insert("user", {
  user_name : "Alan",
  user_password : "secret"
}, function (err, data){
  console.log(data);
});

new AbstractModel().delete("user",{
  user_id : 5
}, function (err, data) {
  console.log(err);
  console.log(data);
});
*/
module.exports = new AbstractModel();
