"use strict";
let category = '';
let disastername_info = '';
let level_info = '';
let currentpage = 'disaster-location'
let aid_info = '';
let country_info = '';
let counter = 0
function suggestCountry(e)
{
    // set variable names
    let countriesfiltert = [];
    let li = ''
    const $countrielist = document.querySelector(`#disaster-location ul`)
    // check if someone is typing something and if yes, filter all the not matching ones out of it
    if (e.target.value)
    {
        countriesfiltert = countries.filter(countries => countries.toLowerCase().includes(e.target.value));
    }
    // make li's of the matching words
    countriesfiltert.forEach(function (counter)
    {
        li += `<li class="disaster-location"> ${counter}</li>`
    })
    $countrielist.innerHTML = li
    // look if there isn't a li tag that has been clicked by the user.
    const $clickedli = document.querySelectorAll(`#disaster-location li`)
    $clickedli.forEach(function (liclicked)
    {
        liclicked.addEventListener(`click`, selectCountry)
    })
}

// select the country that the user chose
function selectCountry(e)
{
    document.querySelector(`#location`).value = e.target.innerHTML;
    country_info = (e.target.innerHTML)
    const $clickedli = document.querySelector(`#disaster-location ul`)
    $clickedli.innerHTML = ''
}

function navigate(e)
{
    e.preventDefault();
    let nextpage = e.target.getAttribute(`data-target`);
    let $button = document.querySelector(`form`)
    $button.addEventListener(`submit`, test)
    document.querySelector(`#${nextpage}`).classList.toggle(`hidden`);
    document.querySelector(`#${currentpage}`).classList.toggle(`hidden`);
    currentpage = nextpage;
    if (nextpage === "disaster-type")
    {
        showdisasters()
    }
    else
    {
        deletedisasters()
    }
    if (nextpage === "disaster-aid")
    {
        showAid()
    }
    else
    {
        deleteaids()
    }
}

// change background color to gold
function selectDisaster(e)
{
    const $selected = document.querySelector('#disaster-type .selected');
    $selected ? $selected.classList.toggle('selected') : null ;
    e.currentTarget.classList.toggle('selected');
    let $selectedd = document.querySelectorAll('#disaster-type .selected p');
    category = $selectedd[1].innerHTML
    $selectedd = document.querySelectorAll('#disaster-type .selected h3');
    disastername_info = $selectedd[0].innerHTML
    $selectedd = document.querySelectorAll('#disaster-type .selected p');
    level_info = $selectedd[2].innerHTML
}

//show the articles aid in the aid fieldset
function showAid()
{
    const $fieldset = document.querySelector(`#disaster-aid .flexcontainer`)
    for (let i = 0; i < 5; i++)
    {
        let x = 0
        while (x < aid[i].disasterTypes.length)
        {
            if (category === aid[i].disasterTypes[x] && (aid[i].minimalLevel <= level_info))
            {
                counter ++
                // make the article
                $fieldset.insertAdjacentHTML('afterbegin', `<article data-target="${aid[i].disasterTypes[x]}"></article>`)
                let $articlefiller = document.querySelector(`#disaster-aid .flexcontainer article`)

                // make the layout in the article
                $articlefiller.insertAdjacentHTML(`beforeend`, `<h3>${aid[i].name}</h3>`)
                $articlefiller.insertAdjacentHTML(`beforeend`, `<figure></figure>`)
                let $figure = document.querySelector(`#disaster-aid .flexcontainer article figure`)
                let word = aid[i].name + ".svg"
                let newword = word.replace(/\s/g,'-').toLowerCase();
                $figure.insertAdjacentHTML("beforeend", `<img alt="figure" src="../../../images/${newword}">`)
                $articlefiller.insertAdjacentHTML(`beforeend`, `<h4>applies to</h4>`)
                $articlefiller.insertAdjacentHTML(`beforeend`, `<p>${aid[i].disasterTypes}</p>`)
            }
            x ++
        }
    }
    let $article = document.querySelectorAll(`#disaster-aid .flexcontainer article`)
    $article.forEach(function (articlenumber)
    {
        articlenumber.addEventListener(`click`, selectAid)
    })
}


function selectAid(e)
{
    const $selected = document.querySelector('#disaster-aid .selected');
    $selected ? $selected.classList.toggle('selected') : null ;
    e.currentTarget.classList.toggle('selected');
    let $selectedd = document.querySelectorAll('#disaster-aid .selected h3');
    aid_info = $selectedd[0].innerHTML
}

// Add additional functions below

// show the bib of disasters in the disaster type fieldset
function showdisasters()
{
    // select the div where everything needs to be stored
    const $fieldset = document.querySelector(`#disaster-type .flexcontainer`)
    //all for all disaster make one articles with a h4 h3 and a p tag.
    for (let i = 0; i<8; i++)
    {
        $fieldset.insertAdjacentHTML('afterbegin', `<article data-target="${disasterTypes[i].name}"></article>`)
        let $articlefiller = document.querySelector(`#disaster-type .flexcontainer article`)
        for (const counter in disasterTypes[i])
        {
            $articlefiller.insertAdjacentHTML(`beforeend`, `<h4>${counter} :</h4>`)
            $articlefiller.insertAdjacentHTML(`beforeend`, `<p>${disasterTypes[i][counter]}</p>`)
        }
        const $remove = document.querySelector(`#disaster-type .flexcontainer article h4`)
        $remove.remove();
        const $reeddit = document.querySelector(`#disaster-type .flexcontainer article p`)
        $reeddit.innerHTML = ''
        $reeddit.insertAdjacentHTML("beforeend", `<h3>${disasterTypes[i].name}</h3>`)
        let word = disasterTypes[i].name + ".svg"
        let newword = word.replace(/\s/g,'-').toLowerCase();
        $reeddit.insertAdjacentHTML("beforeend", `<figure></figure>`)
        let $figure = document.querySelector(`#disaster-type .flexcontainer article figure`)
        $figure.insertAdjacentHTML("beforeend", `<img alt="figure" src="../../../images/${newword}">`)
    }

    let $article = document.querySelectorAll(`#disaster-type .flexcontainer article`)
    $article.forEach(function (articlenumber)
    {
        articlenumber.addEventListener(`click`, selectDisaster)
    })
}

// delete al the objects when switching fieldsets
function deletedisasters()
{
    const $fieldset = document.querySelector(`#disaster-type .flexcontainer`)
    $fieldset.innerHTML = ''
}

function deleteaids()
{
    const $fieldset = document.querySelector(`#disaster-aid .flexcontainer`)
    $fieldset.innerHTML = ''
}


// remove the form and set the message that u made a disaster
function test(e)
{
    e.preventDefault()
    let $remove = document.querySelector(`#submit-disaster form`)
    $remove.remove()
    let $thankyou = document.querySelector(`#submit-disaster`)
    $thankyou.insertAdjacentHTML("beforeend", `<p class="thankyou">Thank you for your submission</p>`)
    let list = [disastername_info, category,level_info,country_info,0,0];
    let disaster = [list[2],list[3]]
    determineAid(disaster,list)
}