#!/bin/python3
import os
import re

from flask import Flask, abort, request, send_from_directory, send_file, render_template, redirect
from IPy import IP
import mimetype
import store

comments = []

def is_subdir(p1, p2):
	if os.path.isdir(p2):
		p1, p2 = os.path.realpath(p1), os.path.realath(p2)
		return p1 == p2 or p1.startswith(p2 + os.sep)
	else:
		return False

app = Flask(__name__)
filestore = store.LocalStore()

@app.route("/")
def index():
	return render_template('index.html')


@app.route("/internal.html",methods=['GET','POST'])
def internal():
    ip =str( request.headers['X-Forwarded-For'].split(',')[0])
    if is_local_ip(ip):
        return render_template("internal.html", comments=comments, flag=flag1)
    else:
        return render_template("blocked.html",ip=ip),403


@app.route("/<path:path>")
def root(path):
	staticDir = "/app/web/"
	filePath = staticDir + path
	try:
		if is_subdir(fpath, staticDir):
			return filestore.read(filepath), {"Content-Type": mimetypes.guess_type(fpath)}
		else:
			return "Invalid path.", 404
	except store.NotFound:
		abort(404)
