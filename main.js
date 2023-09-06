let searchByNameVar = document.getElementById("searchByNameVar")
let searchByFLetterVar = document.getElementById("searchByFLetterVar")
let displayrArea = document.getElementById("displayrArea")


//   });
$("#categBtn").click(function () {
    getCategories()
})

$("#areaBtn").click(function () {
    getArea()
})
$("#ingredientsBtn").click(function () {
    getIngredients()
})
$("#searchBtn").click(function () {
    showSearchInputs()
})
$("#searchByFLette").click(function () {
    searchByFLetter()
})
$("#formBtn").click(function () {
    showContacts()
    $('.formArea').removeClass("d-none")
})


$(document).on("click", ".areaMeals", function () {
    let area = $(this).find("h3").text();
    getAreaMeals(area);
});
$(document).on("click", ".ingradientBox", function () {
    let ingradient = $(this).find("h3").text();
    getIngredientsMeals(ingradient);
});
$(document).on("click", ".categBtn", function () {
    let category = $(this).find("h3").text();
    getCategoriesMeals(category);
});




                             //          loading screen 


$("document").ready(function () {
    $(".loadingScreen").fadeOut(500)
})



                              // open and close side navbar


function openLeftPart() {
    $(".open-btn").click(function () {
        $(this).addClass("d-none")
        $('.close-btn').removeClass("d-none")
        $('.sideNav').animate({ left: 0 }, 500)
        $(".leftPart li").addClass('animate__fadeInBottomLeft')
        $(".leftPart li").removeClass('animate__fadeOutBottomLeft')
    })
}
openLeftPart()
let leftSideWidth = $(".sideNav .leftPart").outerWidth()
function closeLeftPart() {
    $(".close-btn").click(function () {
        $(this).addClass("d-none")
        $('.open-btn').removeClass("d-none")
        $('.sideNav').animate({ left: -leftSideWidth }, 500)
        $(".leftPart li").removeClass('animate__fadeInBottomLeft')
        $(".leftPart li").addClass('animate__fadeOutBottomLeft')
    })
}
closeLeftPart()




// get&display randon meals


async function getRandomMeals() {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    let data = await res.json()
    displayMeals(data)


}
getRandomMeals()
let box
function displayMeals(data) {
    box = "";
    let arr = data.meals;
    for (let i = 0; i < 20; i++) {
        box += `
       <div class="mealDetails col-md-3 p-3">
         <div class="p-0 overflow-hidden meal">
           <img src=${arr[i].strMealThumb} class="w-100 rounded-3">
           <div id="${arr[i].idMeal}" class="mealLayer bg-white bg-opacity-75 text-dark overflow-hidden rounded-3 pt-5">
             <h1>${arr[i].strMeal}</h1>
           </div>
         </div>
       </div>
     `;
    }
    displayrArea.innerHTML = box;

    // Add event listener to each meal element
    let mealElements = document.getElementsByClassName("mealLayer");
    for (let j = 0; j < mealElements.length; j++) {
        mealElements[j].addEventListener("click", handleMealClick);
    }
}

function handleMealClick(event) {
    let mealId = event.target.id;
    getMealDetails(mealId)

}




                           // functions of categories  get&display


async function getCategories() {

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let data = await response.json()
    displayCategories(data)

}

function displayCategories(data) {
    box = ""
    let categ = data.categories
    for (let i = 0; i < categ.length; i++) {
        box += `
    <div class="categBtn col-md-3 p-3">
        <div class="p-0 overflow-hidden meal">
            <img src=${categ[i].strCategoryThumb} class="w-100 rounded-3 ">
            <div class="mealLayer bg-white bg-opacity-75 text-dark text-center overflow-hidden rounded-3 pt-5">
                <h3>${categ[i].strCategory}</h3>
                <p>${categ[i].strCategoryDescription}</p>

            </div>
        </div>
    </div>
        `
    }
    displayrArea.innerHTML = box

}
async function getCategoriesMeals(category) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data = await resp.json()
    displayMeals(data)

}





                               // get &display Area & area meals


async function getArea() {

    let resp = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let data = await resp.json()
    showArea(data.meals)

}
function showArea(data) {
    box = ''
    for (let i = 0; i < data.length; i++) {
        box += `
      <div class="col-md-3 text-white my-2">
      <div class=" areaMeals rounded-2 text-center cursor-pointer" >
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${data[i].strArea}</h3>
      </div>
</div>
      `

    }

    displayrArea.innerHTML = box;



}
async function getAreaMeals(area) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await resp.json()
    displayMeals(data)


}




                                 // get & display ingredients



async function getIngredients(ingredient) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${ingredient}`)
    let data = await resp.json()
    displayIngredients(data)

}
function displayIngredients(data) {
    box = ""
    let arr = data.meals
    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="ingradientBox col-md-3 text-white text-center py-3">
        <i class="fa-solid fa-drumstick-bite fa-5x"></i>
        <h3>${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription}</p>
    </div>
        `
    }
    displayrArea.innerHTML = box;

}
async function getIngredientsMeals(ingradient) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingradient}`)
    let data = await resp.json()
    displayMeals(data)

}



// get & display meal details

async function getMealDetails(mealID) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await resp.json()

    displayMealDetails(data.meals)
}
function displayMealDetails(arr) {
    box = ""
    for (let i = 0; i < arr.length; i++) {
        box += `
       <div class="row container text-white mt-5 pt-5">
       <div class="mealImg col-md-4">
           <img src=${arr[i].strMealThumb} class="w-100">
           <h1 class="mealName">${arr[i].strMeal}</h1>
       </div>
       <div class="mealDescription col-md-8 overflow-hidden">
           <h1>Instructions</h1>
           <p>${arr[i].strInstructions}</p>
           <h3 class="fw-bolder">Area:  <span class="fw-bold"> ${arr[i].strArea}</span></h3>
           <h3 class="fw-bolder">Category :  <span class="fw-bold"> ${arr[i].strCategory}</span></h3>
           <h3 class="fw-bolder"> Recipes : </h3>
           <ul class="recipes list-unstyled d-flex flex-wrap">
               <li> ${arr[i].strIngredient1}</li>
               <li>${arr[i].strIngredient2}</li>
               <li> ${arr[i].strIngredient3}</li>
               <li> ${arr[i].strIngredient4}</li>
               <li> ${arr[i].strIngredient5}</li>

           </ul>
           <h3 class="fw-bolder"> Tags : </h3>
          <a href="" class="btn btn-success me-2"> source</a>
          <a href=${arr[i].strYoutube} class="btn btn-danger me-2"> youtube</a>

       </div>
   </div>
       `
    }
    displayrArea.innerHTML = box;

}





                                        // search inputs & functions



function showSearchInputs() {
    box = ""
    $(".searchArea").removeClass("d-none")

    displayrArea.innerHTML = box;

}
searchByNameVar.addEventListener('keyup', function () {
    searchByName(searchByNameVar.value)
})
async function searchByName(term) {

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let data = await resp.json()
    displayMeals(data)
}


searchByFLetterVar.addEventListener('keyup', function () {
    searchByFLetter(searchByFLetterVar.value)
})

async function searchByFLetter(term) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let data = await resp.json()
    displayMeals(data)
}





                                    // form validation functions
let submitBtn= document.getElementById("submitBtn")

function showContacts() {
    box = ""
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
    
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

document.getElementById('nameInput').addEventListener("keyup",()=>{
    inputsValidation()
})


function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^([A-Z]){1}[a-z]{3,}/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/([a-zA-Z0-9]){5,}.(@yahoo|@gmail)\.com$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/([0-9]){4,}[A-Z][a-z]{1,}/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
