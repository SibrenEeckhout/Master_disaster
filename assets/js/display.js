"use strict";
let storage = []
let bool = true
// Determine parameters for this function yourself
// made function that searches all the saved disasters and puts it in a list
function renderDisasters()
{
    let $p = document.querySelector(`#submitted-disasters p+p`)
    $p.insertAdjacentHTML("afterend", `<form></form>`)
    let $form = document.querySelector(`#submitted-disasters form`)
    $form.insertAdjacentHTML(`beforeend`, `<h4> Wich disaster are you looking for</h4>`)
    $form.insertAdjacentHTML(`beforeend`, `<select id="sort">
            <option value="ascending"> descending</option>
            <option value="descending"> ascending </option>
        </select>`)
    $form.insertAdjacentHTML(`beforeend`, `<select id="selecter">
            <option value="name"> name</option>
            <option value="level"> level </option>
            <option value="categorie"> categorie </option>
        </select>`)
    $form.insertAdjacentHTML(`beforeend`, `<input type="text">`)
    let tester = true
    storage = []
    for (let i = 0; i < 8; i++)
    {
        for (let x = 0; x < 239; x++)
        {
            if (localStorage.getItem(disasterTypes[i].name + " " + countries[x]))
            {
                storage.push(loadFromStorage(disasterTypes[i].name + " " + countries[x]))
                tester = false
            }
        }
    }
    if (tester === false)
    {
        document.querySelector(`#submitted-disasters .flexcontainer`).innerHTML = ''
        displadisasters(storage)
    }
}

/*function renderBasicInfo(disaster){

}

function renderAid(disaster){

}*/

function displayThankYou(e)
{
    let $selected = e.currentTarget
    $selected.insertAdjacentHTML(`afterend`, `<p class="thankyou">thank you for your support</p>`)
}

/*function renderAvailableAid(aid, selector) {

}

function displayFeedbackDisasterSaved(){

}*/

// Add additional functions below

// display the new submitted disasters
function displadisasters(storagee)
{
    const $section = document.querySelector(`main #submitted-disasters .flexcontainer`)
    let x = 0
    while (x < storagee.length)
    {
        $section.insertAdjacentHTML('afterbegin', `<article class="${storagee[x][0]+storagee[x][3]}"></article>`)
        let $articlefiller = document.querySelector(`#submitted-disasters .flexcontainer article`)
        $articlefiller.insertAdjacentHTML(`beforeend`, `<h3>${storagee[x][0]}</h3>`)
        $articlefiller.insertAdjacentHTML(`beforeend`, `<figure></figure>`)
        const $figure = document.querySelector(`main #submitted-disasters .flexcontainer article figure`)
        let word = storagee[x][0] + ".svg"
        let newword = word.replace(/\s/g,'-').toLowerCase();
        $figure.insertAdjacentHTML("beforeend", `<img alt="figure" src="../../../images/${newword}">`)
        $articlefiller.insertAdjacentHTML(`beforeend`, `<dl></dl>`)
        const $dl = document.querySelector(`main #submitted-disasters .flexcontainer article dl`)
        $dl.insertAdjacentHTML(`beforeend`, `<dt>category:</dt>`)
        $dl.insertAdjacentHTML(`beforeend`, `<dd>${storagee[x][1]}</dd>`)
        $dl.insertAdjacentHTML(`beforeend`, `<dt>level:</dt>`)
        $dl.insertAdjacentHTML(`beforeend`, `<dd>${storagee[x][2]}</dd>`)
        $dl.insertAdjacentHTML(`beforeend`, `<dt>location:</dt>`)
        $dl.insertAdjacentHTML(`beforeend`, `<dd>${storagee[x][3]}</dd>`)
        $articlefiller.insertAdjacentHTML(`beforeend`, `<ul></ul>`)
        const $ul = document.querySelector(`main #submitted-disasters .flexcontainer article ul`)
        $ul.insertAdjacentHTML(`beforeend`, `<li></li>`)
        const $li = document.querySelector(`main #submitted-disasters .flexcontainer article li`)
        $li.insertAdjacentHTML(`beforeend`, `<h4>aid:</h4>`)
        $li.insertAdjacentHTML(`beforeend`, `<ul></ul>`)
        const $ultwo = document.querySelector(`main #submitted-disasters .flexcontainer article li ul`)
        $ultwo.insertAdjacentHTML(`beforeend`, `<li>progress: <span>${storagee[x][4]}</span></li>`)
        $ultwo.insertAdjacentHTML(`beforeend`, `<li>goal: <span>${storagee[x][6]}</span></li>`)
        $ul.insertAdjacentHTML(`beforeend`, `<li class="second"></li>`)
        const $litwo = document.querySelector(`main #submitted-disasters .flexcontainer article ul .second`)
        $litwo.insertAdjacentHTML(`beforeend`, `<h4>currency:</h4>`)
        $litwo.insertAdjacentHTML(`beforeend`, `<ul></ul>`)
        const $ulthree = document.querySelector(`main #submitted-disasters .flexcontainer article .second ul`)
        $ulthree.insertAdjacentHTML(`beforeend`, `<li>progress: <span>${storagee[x][5]}</span></li>`)
        $ulthree.insertAdjacentHTML(`beforeend`, `<li>goal: <span>${storagee[x][7]}</span></li>`)
        $articlefiller.insertAdjacentHTML(`beforeend`, `<form id="${storagee[x][0]+storagee[x][3]}" class="hidden"></form>`)
        let $form = document.querySelector(`#submitted-disasters .flexcontainer form`)
        $form.insertAdjacentHTML(`beforeend`, `<h4>donate old packages</h4>`)
        $form.insertAdjacentHTML(`beforeend`, `<select id="Whereareyoufrom?">
            <option value="niks">niks</option>
            <option value="food"> food</option>
            <option value="medicine"> medicine </option>
            <option value="diplomats"> diplomats </option>
        </select>`)
        $form.insertAdjacentHTML(`beforeend`, `<input type="submit" value="have my support">`)
        $form.insertAdjacentHTML(`beforeend`, `<h4>donate currency</h4>`)
        $form.insertAdjacentHTML(`beforeend`, `<input class="number" type="number" min="1" max="10000">`)
        $form.insertAdjacentHTML(`beforeend`, `<input type="submit" value="take my money!">`)
        testifthegoalisreachedstart(storagee, x)
        x ++
    }
    bool = false
    document.querySelector(`#submitted-disasters form`).addEventListener(`input`,sort );
    let $article = document.querySelectorAll(`#submitted-disasters .flexcontainer article`)
    $article.forEach(function (articlenumber)
    {
        articlenumber.addEventListener(`click`, selectarticle)
    })
    let $form = document.querySelectorAll(`#submitted-disasters .flexcontainer article form`)
    $form.forEach(function (formnumber)
    {
        formnumber.addEventListener(`submit`, submitform)
    })
}

// toggle the hidden forms open
function selectarticle(e)
{
    const $selected = document.querySelector('#submitted-disasters .selected');
    $selected ? $selected.classList.toggle('selected') : null ;
    e.currentTarget.classList.toggle('selected');
    let $selectedd = document.querySelector('#submitted-disasters .selected form');
    let koas = $selectedd.classList.value
    let $ptag = document.querySelector('#submitted-disasters .selected p');
    if  ($ptag != null)
    {
        if ($ptag.classList.value === 'success finished')
        {
        }
        else if ($ptag.classList.value === 'thankyou finished')
        {
        }
        else
        {
            $ptag.remove()
        }
    }
    if (koas === 'hidden submitted')
    {
        return
    }
    $selectedd.classList.remove(`hidden`)
}

function submitform(e)
{
    let sendwith = 0
    let sendalsowith = 0
    e.preventDefault()
    e.currentTarget.classList.add(`hidden`)
    let $selected = e.currentTarget
    let selected = $selected.querySelector(`select`).value
    let selectedd = $selected.querySelector(`.number`).value
    if (selectedd === '')
    {
        selectedd = 0
    }
    let article = document.getElementsByClassName(`${$selected.id}`)
    let span = article[0].querySelector(`.second span`)
    let $span = article[0].querySelector(`span`)
    storage.forEach(function (number)
    {
        if (number[0]+number[3] === e.currentTarget.id)
        {
            if (selected === "food")
            {
                number[4] = number[4] + 10
            }
            else if (selected === "medicine")
            {
                number[4] = number[4] + 50
            }
            else if (selected === "diplomats")
            {
                number[4] = number[4] + 100
            }
            number[5] = parseInt(number[5]) + parseInt(selectedd)
            sendwith = number[5]
            sendalsowith = number[7]
            span.innerHTML = sendwith
            $span.innerHTML = number[4]
            saveToStorage(number[0]+number[3], number)
            testifthegoalisreached(e,sendwith, sendalsowith, number)
        }
    })
}

function testifthegoalisreached(e,sendwith, sendalsowith,number)
{
    if (sendwith > sendalsowith || sendwith === sendalsowith)
    {
        number[9] = 1
        saveToStorage(number[0]+number[3], number)
        neverpressagain(e)
    }
    else if (number[4] > number[6] || number[4] === number[6])
    {
        number[9] = 1
        saveToStorage(number[0]+number[3], number)
        neverpressagain(e)
    }

    else
    {
        displayThankYou(e)
    }
}

// if the article has refreshed and the goal is completed, give red arrow
function testifthegoalisreachedstart(storagee, x)
{
    let ptag = ''
    if (storagee[x][9] === 1)
    {
        let koas = document.getElementById(`${storagee[x][0]+storagee[x][3]}`)
        let $article = document.getElementsByClassName(`${storagee[x][0]+storagee[x][3]}`)
        $article[0].classList.add(`success`)
        // add the quotes
        aid.forEach(function (number)
        {
            if (number["name"] === storagee[x][8])
            {
                ptag = number['confirmationMessage']
            }
        })
        $article[0].insertAdjacentHTML("beforeend", `<p class="success finished">${ptag}</p>`)
        koas.classList.add(`submitted`)
    }
}

// if goal is completed but not refreshd, make sure that they cant see the form any more
function neverpressagain(e)
{
    let $selected = e.currentTarget
    e.currentTarget.classList.add(`submitted`)
    $selected.insertAdjacentHTML(`afterend`, `<p class="thankyou finished">thank you for your support</p>`)
}

// sort the disastes
function sort(e)
{
    let i = 0
    let names = []
    let sortetname = []
    let x = 0
    let bib = []
    let $select = document.querySelector(`#sort`).value
    let $selectt = document.querySelector(`#selecter`).value

    // sort the articles based on what the person has typet in
    storage.forEach(function (support)
    {
        names.push(support[0])
    })
    if (e.target.value)
    {
        sortetname = names.filter(name => name.toLowerCase().includes(e.target.value))
    }
    sortetname.sort()
    if ($select === 'ascending')
    {
        sortetname.reverse()
    }
    while (x < sortetname.length)
    {
        storage.forEach(function (number)
        {
            if (number[0] === sortetname[i])
            {
                bib.push(number)
                i++
            }
        })
        x++
    }
    if (!bib.length)
    {
        bib = storage
    }
    if ($selectt === 'level')
    {
        bib = sortlevel(bib,$select)
    }
    else
    {
        bib = sortcategorie(bib,$select)
    }
    const $section = document.querySelector(`main #submitted-disasters .flexcontainer`)
    $section.innerHTML = ''
    displadisasters(bib)
}


// sort on level
function sortlevel(bib,$select)
{
    let x = 0
    let y = 0
    let list = []
    let sendback = []
    bib.forEach(function (number)
    {
        list.push(number[2])
    })
    list.sort(function (a, b){return a-b})
    if ($select === 'descending')
    {
        list.reverse()
    }
    while (y < list.length)
    {
        bib.forEach(function (number)
        {
            if (list[x] === number[2])
            {
                sendback.push(number)
                x ++
            }
        })
        y++
    }
    return sendback
}

// sort on categorie
function sortcategorie(bib,$select)
{
    let x = 0
    let y = 0
    let sendback = []
    let list = []
    bib.forEach(function (number)
    {
        list.push(number[1])
    })
    list.sort()
    if ($select === 'descending')
    {
        list.reverse()
    }
    while (y < list.length)
    {
        bib.forEach(function (number)
        {
            if (list[x] === number[1])
            {
                sendback.push(number)
                x ++
            }
        })
        y++
    }
    return sendback
}