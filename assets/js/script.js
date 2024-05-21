"use strict";

document.addEventListener('DOMContentLoaded', init);

function init()
{
    initSubmitDisaster()
    initSupportDisasters()
}

function initSubmitDisaster()
{
    // call the function to display all the countries when clicking on the box
    if (document.querySelector(`.active a`).innerHTML=== 'Log disaster')
    {
        document.querySelector(`#disaster-location input`).addEventListener(`input`,suggestCountry );
    }

    // look for the right fieldset that needs to be loaded.
    const $nextButtons = document.querySelectorAll(".next,.previous");
    $nextButtons.forEach(function (button){button.addEventListener('click', navigate)})
}

function initSupportDisasters()
{
    if (document.querySelector(`.active a`).innerHTML=== 'Support disaster')
    {
        renderDisasters()
    }
}

// No other functions in this file aside from the ones already declared!

