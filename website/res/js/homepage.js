console.log("working")

var availableUsers = [];



// on keyup, call post request function with the current letter 
function grabSearchVal(event)
{
    const value = event.target.value;
    console.log(value)

    updateSearch("dog");

    // call post function with current value 
}


// fetch existing users (post request)

  // store response

  // convert respons to array of data 

  // update availableUsers to now be what was returned 
    // function: updateSearch




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