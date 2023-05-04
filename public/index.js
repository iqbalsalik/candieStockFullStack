const msg = document.querySelector(".msg")
const inputName = document.getElementById("name");
const description = document.getElementById("description")
const btn = document.getElementById("btn");
const candieList = document.getElementById("candieList")
const quantityOfCandies = document.getElementById("quantity");
const editBtn = document.getElementById("editBtn");
const search = document.getElementById("search")


//GETTING ALL THE DATA FROM THE SERVER AND DISPLAY ON THE SCREEN
window.addEventListener("DOMContentLoaded", showOnDomContentLoaded);

async function showOnDomContentLoaded() {
    try {
        let res = await axios.get("http://localhost:3000/candieStock")

        for (let i = 0; i < res.data.products.length; i++) {
            showNewCandiesOnScreen(res.data.products[i])
        }
    } catch {
        document.write("Something went wrong")
    }
}

// //SUBMITING NEW CANDIE
btn.addEventListener("click", addCandiesToCandieList);

async function addCandiesToCandieList(e) {
    e.preventDefault()
    try {
        if (inputName.value == '' || quantityOfCandies.value == '' || description.value == '') {
            msg.innerText = "All Fields are mandatory"
            setTimeout(() => {
                msg.innerText = ''
            }, 2000);
        } else {
            let res = await axios.post("http://localhost:3000/candieStock", {
                candieName: inputName.value,
                quantity: quantityOfCandies.value,
                candieDescription: description.value
            })
            console.log(res.data)
            showNewCandiesOnScreen(res.data)
        }
    } catch {
        document.write("Something Went Wrong")
    }

    description.value = ''
    inputName.value = ''
    quantityOfCandies.value = ''
}

// //BUY ONE CANDIE
async function buyOneCandie(objId, objName, objdes, objquantity) {
    try {
        if (objquantity <= 0) {
            msg.innerText = "OUT OF STOCK"
            setTimeout(() => {
                msg.innerText = ''
            }, 2000);
        } else {
            //deleting from the server
            await axios.delete(`http://localhost:3000/candieStock/${objId}`)
            removeNodeFromScreen(objId)
            objquantity--
            //posting updated candies details on the screen
                name1 = objName,
                numberOfCandies= objquantity,
                descriptionOfCandies= objdes
            let res = await axios.post(`http://localhost:3000/candieStock`,{
                candieName: name1,
                quantity: numberOfCandies,
                candieDescription: descriptionOfCandies
            })
            showNewCandiesOnScreen(res.data)
        }
    } catch {
        document.write("Something went wrong")
    }
}


// //BUY TWO CANDIES
async function buyTwoCandie(objId, objName, objdes, objquantity) {
    try {
        if (objquantity <= 0) {
            msg.innerText = "OUT OF STOCK"
            setTimeout(() => {
                msg.innerText = ''
            }, 2000);
        } else {
            objquantity -= 2
            if (objquantity < 0) {
                msg.innerText = "OUT OF STOCK"
                setTimeout(() => {
                    msg.innerText = ''
                }, 2000);
                objquantity += 2
            } else {
              //deleting from the server
            await axios.delete(`http://localhost:3000/candieStock/${objId}`)
            removeNodeFromScreen(objId)
            //posting updated candies details on the screen
                name1 = objName,
                numberOfCandies= objquantity,
                descriptionOfCandies= objdes
            let res = await axios.post(`http://localhost:3000/candieStock`,{
                candieName: name1,
                quantity: numberOfCandies,
                candieDescription: descriptionOfCandies
            })
            showNewCandiesOnScreen(res.data)
            }
        }
    } catch {
        document.write("Something went wrong")
    }
}

// //BUY THREE CANDIES
async function buyThreeCandie(objId, objName, objdes, objquantity) {
    try {
        if (objquantity <= 0) {
            msg.innerText = "OUT OF STOCK"
            setTimeout(() => {
                msg.innerText = ''
            }, 2000);
        } else {
            objquantity -= 3
            if (objquantity < 0) {
                msg.innerText = "OUT OF STOCK"
                setTimeout(() => {
                    msg.innerText = ''
                }, 2000);
                objquantity += 3
            } else {
             //deleting from the server
            await axios.delete(`http://localhost:3000/candieStock/${objId}`)
            removeNodeFromScreen(objId)
            //posting updated candies details on the screen
                name1 = objName,
                numberOfCandies= objquantity,
                descriptionOfCandies= objdes
            let res = await axios.post(`http://localhost:3000/candieStock`,{
                candieName: name1,
                quantity: numberOfCandies,
                candieDescription: descriptionOfCandies
            })
            showNewCandiesOnScreen(res.data)
            }
        }
    } catch {
        document.write("Something went wrong")
    }
}


// //CREATING NEW CANDIE AND SHOWING ON THE SCREEN
function showNewCandiesOnScreen(obj) {
    let childNode = ` <li id="${obj.id}">${obj.candieName} ${obj.candieDescription} ${obj.quantity}
    <button id="buyOneCandie" onclick="buyOneCandie('${obj.id}','${obj.candieName}','${obj.candieDescription}','${obj.quantity}')">BuyOne</button>
    <button id="buyTwoCandie" onclick="buyTwoCandie('${obj.id}','${obj.candieName}','${obj.candieDescription}','${obj.quantity}')">BuyTwo</button>
    <button id="buyThreeCandie" onclick="buyThreeCandie('${obj.id}','${obj.candieName}','${obj.candieDescription}','${obj.quantity}')">BuyThree</button>

  </li>`
    candieList.innerHTML = candieList.innerHTML + childNode;

}

// //REMOVING FROM THE SCREEN
function removeNodeFromScreen(objId) {
    let child = document.getElementById(objId)
    candieList.removeChild(child)
}

