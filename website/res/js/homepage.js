console.log("working")

var availableUsers = [];



// on keyup, call post request function with the current letter 
function grabSearchVal(event)
{
    const value = event.target.value;
    console.log(value)

    updateSearch("dog");

    // call post function with current value 
    checkForUser();
}

// fetch existing users (post request)
function checkForUser()
{

    testData1 = "first guy"
    testData = {testData1};

  // contains information regarding the type of fetch request we are doing
  const options = {
    method: 'POST', // type of data 
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(testData1) // the actual location(info) passed into the post request
  }


  const response = await fetch('/usersearch', options) 
  const responseData = await response.json();
  console.log(responseData);
  console.log(responseData.databaseResponse);
  // store response

  // convert respons to array of data 

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
          source: availableUsers
        });
      } );
   
} 