"use strict";

function submitDisaster(list)
{
    saveDisaster(list)
}


// save the new disaster with his disastername
function saveDisaster(disaster)
{
    saveToStorage(disastername_info+country_info, disaster)
}

// Add additional functions below