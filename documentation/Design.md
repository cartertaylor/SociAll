_Group 05 – &quot;[SociAll]&quot;_

_Date and location: March 25, 2021_

_Group Members: Carter Taylor, Ethan Baranowski, Dakota Battle, Liam Scholl, Max Mosier, Quinn Melssen, William Fuertes_

1. **Description:**

Over the last decade social media has exploded, and what was once a landscape that was dominated by a single company has become a warzone with tens of services all vying for space in our computers and minds. SociAll is a keychain designed to combat this phenomenon by giving users the ability to manage multiple accounts from one centralized hub.

SociAll **users** will be able to access our website from any internet enabled device. Upon creating an account they will be able to sign up and become a **user** of the site. From there they are able to _customize_ their _ **profiles** _, as well as _search_for other users _ **profiles.** _ On the other **users profiles** are their **SocialMedia** accounts and a _description_of the **user&#39;s** choosing. As the **users** browse they will also have the opportunity to _follow_ other users and _message_them via the **messenger** if they would like. **Users** will also be able to _text_ our **textBot** a different **user&#39;s profile** _name_ and receive a list back of their **Social Media** accounts.

2. **Architecture:**
_Full resolution:_[https://drive.google.com/file/d/173wfewnJypKiVUZzuhSPochB8pRmT4Ys/view?usp=sharing](https://drive.google.com/file/d/173wfewnJypKiVUZzuhSPochB8pRmT4Ys/view?usp=sharing)
Our system consists of two main layers being our client side and our server side. The client side is visible to the user, and is the main mode of interaction to send data to and `from the client and server. A sub layer of the main client we included is called HTML which just basically represents the interactive part of the website that kicks all the other parts into motion. For example, creating an account will have our client javascript process the information from the user, then send them off to our other main layer called server. Server has two sub layers called requests and database. Requests handles the data sent over from the client, and then attempts to store the info into our database layer. Which will send back the result of the storage (failure or success) back to the client where our client code can notify the user.

 ![image](https://user-images.githubusercontent.com/78051759/112764259-8ac93d80-8fbc-11eb-9952-603605a0884c.png)







3. **Class diagram:**

Our class diagram details the important functionality used by our system, and the reliance some functions have on others.

![image](https://user-images.githubusercontent.com/78051759/112764267-987ec300-8fbc-11eb-9a0a-7b7cfc093f31.png)


4. **Sequence diagram:**

- **Use Case** : Create account
- **Actor** : User
- **Description** : The user will be able to input unique information to create an account with the SociAll website
- **Preconditions** : The user will need to input their name, a unique username, their email, and generate a password for their account.
- **Post-conditions** : The website logs this imputed information into a database
- **Main Flow** :
  - The user opens up the website
  - The user will go to the sign up page on the website
  - The user will input the required information
  - The website will check to see if the information is valid
  - The website will populate a location in the database with the users new information
- **Alternative Flow** :
  - The user opens up the website
  - The user will go to the sign up page on the website
  - The user will input the required information
  - The website will check to see if the information is valid
  - The website will return that the username has already been taken
  - The user will try a different username for their account
  - The website will check to see if the information is valid
  - The website will populate a location in the database with the users new information

5. **Design Patterns:**

**Adapter Design Pattern**

![image](https://user-images.githubusercontent.com/78051759/112764284-acc2c000-8fbc-11eb-8ea7-bcce1ec8fc7b.png)

**Observer Design Pattern**

![image](https://user-images.githubusercontent.com/78051759/112764291-b2200a80-8fbc-11eb-86b1-309f512aadf2.png)

6. **Design Principles:**

Single-responsibility Principle: The principle states that a class should really only have one job, or one responsibility, hence the name. The user classes only have one job (or responsibility), and that is to hold user information and can be passed anywhere that a user&#39;s information needs to go.

Open-closed Principle: The principle says that objects or entities should be open for extension but closed for modification. Our web server code can handle all types of requests and treat &quot;failed&quot; requests and responses as successes in web terms. We can also always add more users no matter what the circumstance is, meaning, it does not matter what the user matters. This goes with this principle and does not need modification within the class.

Liskov Substitution Principle: For our project, we do not take a huge advantage of sub classes, so this principle as of now, does not apply to our project. We hope that in the future, we can apply this principle to our code, improving readability and the overall understanding of how our code works. The reason we are not using many subclasses is simply because we do not need that many of them as of yet. We have a web server in which users can create their accounts, and link their social media. Once we learn how to use social media APIs, we could maybe treat these as more complex classes and subclasses rather than simple classes.

Interface Segregation Principle: Our project does not directly use interfaces, but we will more than likely implement this in the future and it makes sense to do this for user creations and modifications. For example, a user should be able to modify their account by changing a social media link or something similar. However, this would seem to be a contradiction to this principle as the principle states that there should be more than one multipurpose interface. Again, we will not have a multipurpose interface, but we may only have one interface or a small amount of interfaces.

Dependency Inversion Principle: This principle states that entities must depend on abstractions, not on concretions. Going further, it says that a high-level module must not depend on a low-level module, but they should depend on abstractions. Our code uses this principle in our database creation and handling classes. For example, if we have a connect function for our database, and we also have a function for modifying a password in a _different_ class that takes in a mySQL object in construction, this goes against the principle. To follow the principle, we create a database interface and state the basic framework for the mySQL connect function. Now, our password management class can use the interface for construction instead of the mySQL class directly. This is currently not fully implemented in our project yet, but it is in planning.
