# imports
from flask import Flask, request
import requests
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse

# twilio acc info
account_sid = "AC16136c6a424ad7503d7df3a3bdb2a422"
auth_token = "9a037326814f2b00f9ede3e76d2792a2"
account_num = "+13852360797"

client = Client(account_sid, auth_token)

# Flask webapp setup
app = Flask(__name__)

@app.route('/textbot')
def hello_world():
    return 'Test'

if __name__ == "__main__":
	app.run(debug = True)