#imports
from flask import Flask, request
import requests
from twilio.twiml.messaging_response import MessagingResponse
import mysql.connector as mysql
from dotenv import  load_dotenv
import os
import smtplib

# PREPPING FLASK OBJECT
app = Flask(__name__)

# LOADING DOTENV TO PULL DATA FROM ENV FILE
load_dotenv()


# HELPER 
def searchDatabase(UserSearchingFor):
    # SSH INFO PULLED FROM ENV FILE
    HOST = os.getenv('DATABASE_HOST_NAME')
    DATABASE = os.getenv('DATABASE_NAME')
    USER = os.getenv('DATABASE_USER_NAME')
    PASSWORD = os.getenv('DATABASE_PASSWORD')
    TABLE = os.getenv('DATABASE_MAIN_TABLE')

    # ESTABLISH CONNECTION
    db_connection = mysql.connect(host = HOST, database = DATABASE, user = USER, password = PASSWORD)
    print("Connected to:", db_connection.get_server_info())
    
    # CREATE CURSOR OBJECT TO RUN SQL QUERIES
    cursor = db_connection.cursor()

    # PREPARE QUERY TO BE EXECUTED
    sql = "SELECT * FROM " + TABLE + " WHERE userName = '" + UserSearchingFor + "'"

    # EXECUTE QUERY
    cursor.execute(sql)

    # SAVE INFO GENERATED FROM QUERY TO VARIABLE
    result = cursor.fetchone()

    # CLOSE DATABASE OBJECTS AND CONNECTIONS
    cursor.close()
    db_connection.close()

    return result



# check for post request to /bot filepath
@app.route('/bot', methods=['POST'])
def bot():
    # PARSE INCOMING MESSAGE FOR USERNAME
    incoming_msg = request.values.get('Body', '')

    # PREPARE RESPONSE OBJECT
    resp = MessagingResponse()

    # PREPARE MSG TO BE FILLED OUT AND PASSED TO RESP OBJECT
    msg = resp.message()

    responded = False

    # CREATES INFO VARIABLE WITH INFORMATION FROM THE DATABASE QUERY DONE IN SEARCHDATABASE
    info = (searchDatabase(incoming_msg))

    # CHECK TO SEE IF QUERY RETURNED EMPTY AND IF SO GIVE PREDETERMINED MESSAGE
    if info is None:
        msg.body("Sorry, {} is not a SociAll user. Tell them to sign up at http://sociall.live/otherPages/sign-up-page.html!".format(incoming_msg))

    # IF LIST NOT EMPTY, PARSE INFO AND RETURN
    else:
        # PARSE INFO INTO SEPERATE PARTS
        userName = info[0]
        firstName = info[1]
        lastName = info[2]
        phoneNumber = info[3]
        email = info[4]

        # PREPARE STRING FOR MSG BODY
        finalString = ("SociAll Username: {}\n"
                        "First Name: {}\n"
                        "Last Name: {}\n"
                        "Phone Number: {}\n"
                        "Email Address: {}\n").format(userName, firstName, lastName, phoneNumber, email)

        # LOAD INFO INTO MSG BODY
        msg.body(finalString)

    # MESSAGE RESPONDED TO
    responded = True


    return str(resp)


if __name__ == '__main__':
    app.run()



@app.route('/email', methods=['POST'])
def email():
    # RETRIEVING DATA FROM POST REQUEST
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    email = request.form.get("email_address")
    message = request.form.get("message")

    # SET UP AND LOG INTO GMAIL SMTP SERVER
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(str(os.getenv("EMAIL_USERNAME")), str(os.getenv('EMAIL_PASSWORD')))
    
    # SEND EMAIL
    server.sendmail("contactusatsociall@gmail.com", "contactusatsociall@gmail.com", message)
    
# to start file use 'python text_chat.py'
# to expose port to internet use 'gunicorn -b :5000 text_chat:app'