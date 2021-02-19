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

# Flask setup
app = Flask(__name__)

@app.route('/textbot')
def hello_world():
    return 'Test'

if __name__ == "__main__":
	app.run(debug = True)

"""
# database placeholder
databaseHolder = { 'qMelssen' : 'twitter: qmelTwit\n facebook: qmelFace',
				   'maxMose' : 'twitter: MoseTwit\n facebook: MoseFace' }



# routing POSTs to file
@app.route('/textbot', methods=['POST'])

# texting functionality
def bot():
	# parsing message and preparing response
	message_from_user = request.values.get('Body', '').lower()
	resp = MessagingResponse()
	msg = resp.message()
	responded = False

	if message_from_user in databaseHolder:
		msg.body(databaseHolder[message_from_user])
		responded = True

	else:
		msg.body("We don't recognize that user! Send them this link to get them signed up!"
			+ "http://sociall.live/otherPages/sign-up-page.html")
		responded = True

	return str(resp)

def generateText():
	format = request.args.get('test')

"""