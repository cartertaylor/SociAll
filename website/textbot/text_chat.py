# imports
from flask import Flask, request
import requests
from twilio.twiml.messaging_response import MessagingResponse

# database placeholder
databaseHolder = { 'qMelssen' : 'twitter: qmelTwit\n facebook: qmelFace',
				   'maxMose' : 'twitter: MoseTwit\n facebook: MoseFace' }

# Flask setup
app = Flask(__name__)

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
