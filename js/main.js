//Dom elements created with their appropiate attributes
studentList = document.querySelector('.student-list')
list = document.querySelectorAll('li')
body = document.querySelector('body')
pageHeader=document.querySelector('.page-header')
studentSearch = document.createElement('div')
studentSearch.setAttribute("class", "student-search")
input = document.createElement('input')
input.setAttribute("placeholder", "Search for students...")
search = document.createElement('button')
search.innerHTML="Search"
studentSearch.appendChild(input)
studentSearch.appendChild(search)
pageHeader.appendChild(studentSearch)
pagination = document.createElement("div")
page = document.querySelector('.page')
page.appendChild(pagination)
pagination.setAttribute("class", "pagination")

//Function that shows the list members depending the number of the page and the the list
let showPage = function (pageNumber, list) {
    studentList.innerHTML=""
    for (let i = 0; i < list.length; i++) {
        if (i>=(pageNumber-1)*10 && i<(pageNumber*10)) {
            studentList.appendChild(list[i])
        }       
    }
}
//Buttons created with the number of the page and the list of parameters in order to use the complete list or the search list
let appendPageLinks = function (list) {

    let numberPages = Math.ceil(list.length / 10)
    let remove = page.removeChild(document.querySelector(".pagination"))  
    pagination = document.createElement("div")
    page.appendChild(pagination)
    pagination.setAttribute("class", "pagination")
    ul = document.createElement("ul")
    pagination.appendChild(ul)
    for (let i = 1; i <= numberPages; i++) {
        li= document.createElement("li")
        ul.appendChild(li)
        a = document.createElement("a")
        a.innerHTML=i
        li.appendChild(a)
        a.addEventListener("click", function (e) {
            for (let j = 0; j < ul.children.length; j++) {
                if(ul.children[j].children[0].classList.contains("active")){
                    ul.children[j].children[0].classList.remove("active")
                }
            }
            showPage(e.target.innerHTML, list)
            e.target.setAttribute("class", "active")
        })
    }
    
}
//keyup and click event for the input text and search button that filters the list and use the previous functions
input.addEventListener('keyup', function (e) {
    let filteredList = []
    for (let i = 0; i < list.length; i++) {
        if (list[i].children[0].children[1].innerHTML.includes(e.target.value) || list[i].children[0].children[2].innerHTML.includes(e.target.value) ) {
            filteredList.push(list[i])
        }
    }  
    showPage(1,filteredList)
    appendPageLinks(filteredList)
    if (filteredList.length===0) {
        studentList.innerHTML="No results have been found"
    }
})
search.addEventListener("click",function () {
    let searchList = []
    for (let i = 0; i < list.length; i++) {
        if (list[i].children[0].children[1].innerHTML.includes(input.value) || list[i].children[0].children[2].innerHTML.includes(input.value)) {
            searchList.push(list[i])
        }
    }
    showPage(1, searchList)
    appendPageLinks(searchList)
    if (searchList.length === 0) {
        studentList.innerHTML = "No results have been found"
    }
})
//Use the pagination when the page is load
document.addEventListener("load", showPage(1,list))
document.addEventListener("load", appendPageLinks( list))




