#imports
from flask import Flask, request, redirect
import requests
from twilio.twiml.messaging_response import MessagingResponse
import mysql.connector as mysql
from dotenv import  load_dotenv
import os
import smtplib
from collections import OrderedDict

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
    PROFILE_TABLE = os.getenv('DATABASE_PROFILE_TABLE')

    # ESTABLISH CONNECTION
    db_connection = mysql.connect(host = HOST, database = DATABASE, user = USER, password = PASSWORD)
    print("Connected to:", db_connection.get_server_info())
    
    # CREATE CURSOR OBJECT TO RUN SQL QUERIES
    cursor = db_connection.cursor()

    # PREPARE QUERY OF USER TABLE TO BE EXECUTED
    sql = "SELECT * FROM " + TABLE + " WHERE userName = '" + UserSearchingFor + "'"

    # EXECUTE QUERY
    cursor.execute(sql)

    # SAVE INFO GENERATED FROM QUERY TO TUPLE VARIABLE
    resultUser = cursor.fetchone()

    # PREPARE QUERY OF PROFILE TABLE TO BE EXECUTED
    sql = "SELECT * FROM " + PROFILE_TABLE + " WHERE userName = '" + UserSearchingFor + "'"
    
    # EXECUTE QUERY
    cursor.execute(sql)

    # SAVE INFO GENERATED FROM QUERY TO TUPLE VARIABLE
    resultProfile = cursor.fetchone()


    # CLOSE DATABASE OBJECTS AND CONNECTIONS
    cursor.close()

    db_connection.close()

    return resultUser, resultProfile



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
    userInfo, userProfile = (searchDatabase(incoming_msg))


    # CHECK TO SEE IF QUERY RETURNED EMPTY AND IF SO GIVE PREDETERMINED MESSAGE
    if userInfo is None:
        msg.body("Sorry, {} is not a SociAll user. Tell them to sign up at http://sociall.live/otherPages/sign-up-page.html!".format(incoming_msg))

    # IF LIST NOT EMPTY, PARSE INFO AND RETURN
    else:
        # LOAD INFO INTO DICTIONARY
        userDict = OrderedDict()

        userDict["SociAll Username: "]  = userInfo[0]
        userDict["First Name: "]        = userInfo[1]
        userDict["Last Name: "]         = userInfo[2]
        userDict["Phone Number: "]      = userInfo[3]
        userDict["Email Address: "]     = userInfo[4]
        userDict["Twitter Handle: "]    = userProfile[2]
        userDict["Facebook Handle: "]   = userProfile[3]
        userDict["Snapchat Handle: "]   = userProfile[4]



        # PREPARE FINALSTRING TO BE ADDED TO
        finalString = ''

        # LOOP THROUGH DICTIONARY AND ADD COMPONENTS TO THE FINAL STRING
        for item in userDict.items():
            # IF DICT VALUE NOT NULL, LOAD INTO FINALSTRING
            if item[1] != None:
                print(item[0] + item[1])
                finalString += item[0] + item[1] + '\n'


        # LOAD INFO INTO MSG BODY
        msg.body(finalString)

    # MESSAGE RESPONDED TO
    responded = True


    return str(resp)



@app.route('/email', methods=['POST'])
def email():
    # RETRIEVING DATA FROM POST REQUEST
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    email = request.form.get("email_address")
    message = request.form.get("message")

    # ADD KEY INFO TO MESSAGE
    message = ("First Name - {}\n"
                "Last Name - {}\n"
                "Email Address - {}\n"
                "Message From User - {}\n").format(first_name, last_name, email, message)

    # SET UP AND LOG INTO GMAIL SMTP SERVER
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(str(os.getenv("EMAIL_USERNAME")), str(os.getenv('EMAIL_PASSWORD')))
    
    # SEND EMAIL
    server.sendmail(str(os.getenv("EMAIL_USERNAME")), str(os.getenv("EMAIL_USERNAME")), message)

    # REROUTE USER TO RESPONSE PAGE
    return redirect("http://sociall.live/otherPages/contact-confirmation.html")
    



if __name__ == '__main__':
    app.run()
# to start file use 'python text_chat.py'
# to expose port to internet use 'gunicorn -b :5000 applications:app'