#!/bin/python3
import os
import re

from flask import Flask, abort, request, send_from_directory, send_file, render_template, redirect, jsonify
import cx_Oracle
import json
import pickle
import re


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
	queryFile = f'./queries/query{queryType}.sql'


	dsn_tns = cx_Oracle.makedsn('oracle.cise.ufl.edu', '1521', 'orcl')
	conn = cx_Oracle.connect(user=ORACLE_USERNAME, password=ORACLE_PASSWD, dsn=dsn_tns)
	cursor = conn.cursor()
	
	with open(queryFile) as fin:
		query = fin.read()
		query = re.sub(';', '', query)

	if queryType == 2:
		query = re.sub('<month>', str(month), query)
		query = re.sub('<State>', state, query)

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
			queryCache = pickle.load(fin)
		print("[*] Loaded file")
	except FileNotFoundError:
		pass
	try:
		app.run()
	except KeyboardInterrupt:
		pass

	# print(queryCache)
	with open('cachedResults', 'wb') as fout:
		pickle.dump(queryCache, fout, pickle.HIGHEST_PROTOCOL)
	print("[*] Wrote cache to file")