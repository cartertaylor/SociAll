// initial storage place for available users
var availableUsers = [];


// on keyup, call post request function with the current letter 
function grabSearchVal(event)
{
  // grab current value in search bar
  const value = event.target.value;

  // call post function with current value 
  checkForUser(value);
}

// fetch existing users (post request)
async function checkForUser(availableLetters)
{
  // check for empty string (will only run with actual data)
  if (availableLetters != "")
  { 
    // create object (key value pairs) that contain letters from search bar
    searchLetters = {lettersProvided: availableLetters}

    // contains information regarding the type of fetch request we are doing
    const options = {
      method: 'POST', // way we want data sent
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(searchLetters) // the actual location(info) passed into the post request
    }

    const response = await fetch('../usersearch', options) 
    const responseData = await response.json();
    console.log(responseData);
    
    // store response (of users)
    let usersObject = responseData.foundUsers; 

    // convert response to array of data and updates
    // and stores it in a temp array  
      // function: convertToArray
    let tempArray = convertToArray(usersObject);

    // update availableUsers within search bar to now represent
    // what was found in database using what we just stored in tempArray 
      // function: updateSearch
    updateSearch(tempArray);

  }

}


function convertToArray(jsonObject)
{
    //console.log(jsonObject)
    
    // empty the array of available users
    availableUsers = [];

    let tempArray = [];

    // iterate over the users in the object provided
    for (value in jsonObject)
    {
        //console.log(jsonObject[value].userName);
     
        // store data found in object in a tempy array 
        tempArray.push(jsonObject[value].userName)
        
        //console.log(availableUsers)

    }

   // console.log(tempArray)
    
    // return the temp array with newly stored data
    return tempArray;
    
}

// probably wont need this because of convertToArray
// function updates the available user to only include what is currently in database
function updateSearch(tempArray)
{ 

  // with new users found, store them in search bar
  $( function() {
      console.log(availableUsers)
      $( "#searcher" ).autocomplete({

        // source represents where the search bar  
        source: tempArray
      });
    } );
  
} 


// initial run of the autocomplete function
$( function() {
  //console.log(availableUsers)
  $( "#searcher" ).autocomplete({
      source: availableUsers
    });
  } );