#imports
from flask import Flask, request
import requests
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

# check for post request to /bot filepath
@app.route('/bot', methods=['POST'])
def bot():
    # parse incoming message for username
    incoming_msg = request.values.get('Body', '').lower()
    resp = MessagingResponse()
    msg = resp.message()
    responded = False
    # check to see if username is in database
    if 'qmelsociall' in incoming_msg:
        # return info
        info = ("SociAll Presents: Quinn Melssen!\n"
                "Instagram: QmelInsta\n"
                "Facebook: QmelFace\n"
                "LinkedIn: QmelUnemployed")

        msg.body(info)
        responded = True

    # standardized output if user not found in database
    if not responded:
        msg.body("Sorry, that user hasn't registered with us yet! Tell them to sign up!")

    return str(resp)


if __name__ == '__main__':
    app.run()


# to start file use 'python text_chat.py'
# to expose port to internet use 'gunicorn -b :5000 text_chat:app'