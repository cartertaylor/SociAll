console.log("working")

// initial storage place for available users
var availableUsers = [];

// on keyup, call post request function with the current letter 
function grabSearchVal(event)
{
    // grab current value in search bar
    const value = event.target.value;
    console.log(value)

    // (this should be removed after testing)
    updateSearch("dog");

    // call post function with current value 
    checkForUser(value);
}

// fetch existing users (post request)
async function checkForUser(availableLetters)
{
  console.log(availableLetters);

  testData1 = "first guy"
  testData = {testData1};

  searchLetters = {lettersProvided: availableLetters}

  // contains information regarding the type of fetch request we are doing
  const options = {
    method: 'POST', // way we want data sent
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(searchLetters) // the actual location(info) passed into the post request
  }

  console.log (searchLetters)
  console.log(options.body);

  const response = await fetch('../usersearch', options) 
  const responseData = await response.json();
  console.log(responseData);
  console.log(responseData.databaseResponse);

  // store response

  // convert response to array of data 
    // function: ??

  // update availableUsers to now be what was returned 
    // function: updateSearch

}


// initial run of the autocomplete function
$( function() {
console.log(availableUsers)
$( "#searcher" ).autocomplete({
    source: availableUsers
  });
} );


// function updates the available user to only include what is currently in database
function updateSearch(sentUsers)
{ 
  
  availableUsers = ["dog", "cat"];
  $( function() {
      console.log(availableUsers)
      $( "#searcher" ).autocomplete({

        // source represents where the search bar  
        source: availableUsers
      });
    } );
  
} 