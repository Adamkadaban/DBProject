#!/bin/python3
import os
import re

from flask import Flask, request, jsonify
from cx_Oracle import makedsn, connect, init_oracle_client
from pickle import load, dump, HIGHEST_PROTOCOL
from re import sub

try:
	init_oracle_client(lib_dir='c:\Program Files\Oracle')
except Exception as e:
	print(e)
	exit(-1)


with open('creds.config.txt') as fin:
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
	queryFile = f'./queries/query{queryType}.sql'


	dsn_tns = makedsn('oracle.cise.ufl.edu', '1521', 'orcl')
	conn = connect(user=ORACLE_USERNAME, password=ORACLE_PASSWD, dsn=dsn_tns)
	cursor = conn.cursor()
	
	with open(queryFile) as fin:
		query = fin.read()
		query = sub(';', '', query)

	if queryType == 2:
		query = sub('<month>', str(month), query)
		query = sub('<State>', state, query)

	res = cursor.execute(query)
	column_names = [i[0] for i in cursor.description]
	json_out =  [dict(zip(column_names, i)) for i in res]
	queryCache[cacheKey] = json_out
	return json_out


app = Flask(__name__)

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