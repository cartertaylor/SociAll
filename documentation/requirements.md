# Requirements

*Group 05 – “[SociAll]”*\
*Date and location: Feb 21, 2021*\
*Group Members: Carter Taylor, Ethan Baranowski, Dakota Battle, Liam Scholl, Max Mosier, Quinn Melssen, William Fuertes*

## 1. Positioning
### 1.1 Problem statement
Problem statement: The problem of keeping up with several social media apps at once affects most social media users; the impact of which is disorganization in one’s life and an inability to stay in touch with their friends and family.

### 1.2. Product Position Statement
For users of multiple social media platforms who struggle to keep up, SociAll is a keychain that lowers the stress of managing multiple accounts; unlike individual tech companies that strive to separate themselves from others at the expense of usability.

### 1.3. Value proposition & Consumer Segment
Value Proposition: SociAll is a social media platform that helps manage your other social media accounts in a fun responsive way which offers a unique way to connect with people. 
Consumer Segment: People who use multiple social media platforms.


## 2. Stakeholders

**2.1 Users**: These are the people who are going to be interacting with the software in hopes of untangling their complicated social media webs.

**2.2 Developers**: Developers will be working with the website on a daily basis as well as any framework involved in its inception.

**2.3 Tech Companies**: Tech companies are pseudo competitors to our website, while simultaneously being the reason for its creation.

## 3. Functional requirements (features)
3.1 Users will be able to search for other users
3.2 Users will be able to create and edit their accounts
3.3 Users will be able to follow other users and keep up to date with their social media
3.4 Users will be able to reset their passwords
3.5 Users will be able to browse accounts
3.6 Users will be able to change their usernames once every quarter
3.7 Users will be able to customize their personal account pages
3.8 Users will be able to text SociAll an account name and get relevant information
3.9 Users will be able to report accounts that violate TOS
3.10 Administrators will be able to take account pages down
3.11 Administrators will be able view reports and take action

## 4. Non-functional requirements
4.1 Availability: Different platforms will be available to the user which is what SociAll is about.
4.2 Usability: Will allow viewing access to different social media accounts from different platforms in one area.
4.3 Security: Maintains confidence in users when they use the password manager.
4.4 Flexibility: Releases the stress of having to switch to different social media apps.

## 5. MVP
The MVP for SociAll is going to be a website that the user can create an account with and link all of their social media accounts. The features we want to have validated is the ability to store all other social media accounts. We are going to do this by using their APIs. Once we know we can access the APIs, we will then be able to see the extent of which we can work with them.

## 6. Use cases

### 6.1. Use case diagram
https://gyazo.com/2b2cf8c884e80a1df6db0c4bf2e7c638

### 6.2. Use case descriptions and interface sketch

**(i)**
Use Case: Create account

Actor: User

Description: The user will be able to input unique information to create an account with the SociAll website

Preconditions: The user will need to input their name, a unique username, their email, and generate a password for their account.

Post-conditions: The website logs this imputed information into a database

Main Flow: 
The user opens up the website
The user will go to the sign up page on the website
The user will input the required information
The website will check to see if the information is valid
The website will populate a location in the database with the users new information

Alternative Flow:
The user opens up the website
The user will go to the sign up page on the website
The user will input the required information
The website will check to see if the information is valid
The website will return that the username has already been taken
The user will try a different username for their account
The website will check to see if the information is valid
The website will populate a location in the database with the users new information

**(ii)**
Use Case: Reset passwords

Actor: User

Description: The server will use their portable device to take the customers’ orders

Preconditions: A user has to wish to change the password to their account

Post-conditions: The password is changed and the user must resign into their account

Main Flow: 
The user opens up the website
The user will go to the sign in page on the website
User clicks ‘forgot password’ button
User is asked for email corresponding to account
User follows link sent to their email account to reset their password
User is asked to sign back in

Alternative Flow:
User can not remember email address associated with account
User is asked to give the phone number associated with the account instead
User gets text and changes password via pin

**(iii)**
Use Case: Ban Users

Actor: Administrator

Description: The administrator will ban a user, preventing them from logging in.

Preconditions: The user in question must have a registered account.

Post-conditions: The user is prevented from logging in and receives a message upon attempting to login.

Main Flow: 
The administrator opens a user profile.
The administrator selects the “ban” option.
The system asks for confirmation.
The administrator confirms.
The user is banned, blocking access to their account.

Alternative Flows:
The administrator opens a user profile.
The administrator selects the “ban” option.
The system asks for confirmation.
The administrator cancels during confirmation.
The system cancels the ban currently in progress.

The administrator opens a user profile.
The administrator selects the “ban” option.
The system notifies the administrator that the user is already banned.

**(iv)**
Use Case: View any User page

Actor: User

Description: The user of the website will be able to click on someone's username, or search for someone’s username and view their user page.. 

Preconditions: The username needs to have a user page associated with it

Post-conditions: The user will be able to view the web page of the username

Main Flow: 
The user clicks on a username of a different profile
The website loads the usernames user page
The user can now view the usernames user page

Alternative Flow:
The user searches for a username of a different profile
The website loads the usernames user page
The user can now view the usernames user page

**(v)**
Use Case: Post Update on Homepage

Actor: Administrator

Description: The administrator will be able to post updates on the homepage for all users to see

Preconditions: The administrator needs to be able to post an update on the homepage of the website

Post-conditions: A new update will be posted on the homepage

Main Flow: 
Administrator pulls up a new post feature 
Administrator fills out the new post to what they want
The administrator posts their post
The users can see the new post

Alternative Flow:
The administrator sets the website to do an automatic post when the website goes down for maintenance
The website goes down for maintenance
The website displays the outage post
All users can view the outage post

**(vi)**
Use Case: Delete account


**Alternative Flow**:
Actor: User

Description: The user deletes their account

Preconditions: The user has a registered account.

Post-conditions: The user does not have a registered account.

Main Flow: 
The user opens to their profile.
The user selects the “delete” option.
The system asks for confirmation.
The user confirms.
The system deletes the user’s account

Alternative Flow:
The user opens their profile
The user selects the “delete” option.
The system asks for confirmation.
The user cancels the account deletion in progress.


**(vii)**
Use Case: Search for Users

Actor: User, Administrator

Description: The user or administrator will be able to search the website to find the account pages of users.

Preconditions: The account that they are searching for must exist and be registered in the database/system.

Post-conditions: The page they were looking for is displayed.

Main Flow: 
User searches for account in query box
Accounts that they were searching for comes up
User clicks on the account that they were looking for to bring up more information

Alternative Flow:
The account searched for isn’t found
Alternate accounts that have similar names to the one searched are displayed
User may find designated account amongst this list

## 7. User stories

1) As a user, I want to be able to view my friends’ accounts from each platform so I don’t have to look for them over and over.
2) As a user, I want to be able to save my login credentials so I can login with one click next time.
3) As an administrator, I want to be able to shut down someone's account so that I can stop users from violating our terms of use.
4) As a music maker, I want to be able to easily share my Spotify account to get more exposure.
5) As a videogame player, I would like a way to search for other peoples gamer tags to be able to play with more people. 
6) As a mother, I would like to have an easy way to see my children's social media accounts so I can make sure they aren’t talking to strangers.
7) As an employer, I would like to see a potential employee's social media to see what kind of person they are.
8) As a video game player, I would like to view other players’ accounts on other launchers so that I can see what they are playing.
9) As a user, I want to see posts from all linked social media pages.
10) As a user of the app, I want to be able to sign in using my fingerprint or face id so I don’t have to type my credentials every time I log in.
11) As a user of the app, I want to be able to change my password so that I can secure my account in the event of a compromise.
12) As a user of the app, I want to have the ability to request a password change so that I can get into my account in the event that I’m locked out.
13) As a smartphone user, I want to be able to contact the SociAll team for support so I can report bugs with the app.
14) As a user, I want to store my professional/non-professional accounts in one place so I can easily switch back and forth.


## 8. Issue Tracker
https://github.com/cartertaylor/SociAll/projects/1
