#imports
from flask import Flask, request
import requests

# PREPPING FLASK OBJECT
app = Flask(__name__)

@app.route('/email', methods=['POST'])
def bot():
