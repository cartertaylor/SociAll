Analysis
System description
Over the last decade social media has exploded, and what was once a landscape that was dominated by a single company has become a warzone with tens of services all vying for space in our computers and minds. SociAll is a keychain designed to combat this phenomenon by giving users the ability to manage multiple accounts from one centralized hub. 

SociAll users will be able to access our website from any internet enabled device. Upon creating an account they will be able to sign up and become a user of the site. From there they are able to customize their profiles, as well as search for other users profiles. On the other users profiles are their SocialMedia accounts and a description of the user’s choosing. As the users browse they will also have the opportunity to follow other users and message them via the messenger if they would like. 
-tbd adding small details about textbot



Model








Classes:
User 
Variables: userName, password, email, userType
Profile 
Variables: picture, description object, list of Social media objects
-> SocialMedia (class) 
Variables: socialMediaSite, socialMediaUserName, socialMediaProfile
-> description  (class)
Variables: inputArea
Administrator (inherits from Users)
Login
Variables: userName, password, isAuthenticated
Search (will contain user variables)
Variables: resultContainer, array of user objects (userObjects)
Scan object
Messenger  
Variables: sender, receiver, text, sendMessage
-> Filter (class)
Text Bot 
