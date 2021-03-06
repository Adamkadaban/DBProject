#!/bin/python3
import os
import re

from flask import Flask, request, jsonify
from flask_cors import CORS
from cx_Oracle import makedsn, connect
from pickle import load, dump, HIGHEST_PROTOCOL
from re import sub

try:
	from cx_Oracle import init_oracle_client
	init_oracle_client(lib_dir='c:\\Program Files\\Oracle')
except:
	pass

with open('creds.config') as fin:
	ORACLE_USERNAME = fin.readline().rstrip()
	ORACLE_PASSWD = fin.readline().rstrip()

queryCache = {}


def getQueryResult(userInput):
	cacheKey = str(userInput)
	if cacheKey in queryCache:
		return queryCache[cacheKey]

	queryType = userInput['queryType']
	if queryType == 2:
		state = userInput['state']
		month = userInput['month']
		sort1 = userInput["sort1"]
		sort2 = userInput["sort2"]
		sort3 = userInput["sort3"]
		sort4 = userInput["sort4"]
		sort5 = userInput["sort5"]
	queryFile = f'./queries/query{queryType}.sql'


	dsn_tns = makedsn('oracle.cise.ufl.edu', '1521', 'orcl')
	conn = connect(user=ORACLE_USERNAME, password=ORACLE_PASSWD, dsn=dsn_tns)
	cursor = conn.cursor()
	
	with open(queryFile) as fin:
		query = fin.read()
		query = sub(';', '', query)

	if queryType == 2:
		query = sub('<month>', str(month), query)
		query = sub('<state>', state, query)
		query = sub('<sort1>', str(sort1), query)
		query = sub('<sort2>', str(sort2), query)
		query = sub('<sort3>', str(sort3), query)
		query = sub('<sort4>', str(sort4), query)
		query = sub('<sort5>', str(sort5), query)

	res = cursor.execute(query)
	column_names = [i[0] for i in cursor.description]
	json_out =  [dict(zip(column_names, i)) for i in res]
	queryCache[cacheKey] = json_out
	return json_out


app = Flask(__name__)
CORS(app)

@app.route("/api", methods=['POST'])
def api():
	userData = request.get_json(force=True)
	return jsonify(getQueryResult(userData)), 200, {'ContentType':'application/json'} 


if __name__ == "__main__":
	try:
		with open('cachedResults', 'rb') as fin:
			queryCache = load(fin)
		print("[*] Loaded file")
	except FileNotFoundError:
		pass
	except EOFError:
		pass
	try:
		app.run()
	except KeyboardInterrupt:
		pass

	# print(queryCache)
	with open('cachedResults', 'wb') as fout:
		dump(queryCache, fout, HIGHEST_PROTOCOL)
	print("[*] Wrote cache to file")
