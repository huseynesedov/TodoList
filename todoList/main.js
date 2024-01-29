const userAddBtn = document.getElementById("userAdd");
const changeUserBtn = document.getElementById("changeUser");
const fullName = document.querySelector("#fullName")
const email = document.querySelector("#email")
const pass = document.querySelector("#pass");
const tbody = document.querySelector("tbody");
let customId = localStorage.getItem("userId");
let findId;
if (customId === null) {
    customId = 0;
}

let users = JSON.parse(localStorage.getItem("users"));
if (users === null) {
    users = []
}
userAddtoTable(users)

userAddBtn.addEventListener("click", (e) => {
    e.preventDefault();
    users.push({
        id: ++customId,
        name: fullName.value,
        email: email.value,
        password: pass.value
    })
    localStorage.setItem("userId", customId);
    userAddtoTable(users);
    refreshForm()
})

changeUserBtn.addEventListener("click", (e) => {
    e.preventDefault();
    userAddBtn.classList.remove("d-none");
    changeUserBtn.classList.add("d-none")
    users.forEach(user => {
        if (user.id === findId) {
            user.name = fullName.value;
            user.email = email.value;
            user.password = pass.value;
        }
    });
    userAddtoTable(users);
    refreshForm()
})

function userAddtoTable(param) {
    tbody.innerHTML = ""
    param.forEach(user => {
        tbody.innerHTML += `<tr>
        <td scope="row">${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
            <button class="btn  btn-danger" onclick="deleteUser(${user.id})">delete</button>
            <button class="btn  btn-secondary" onclick="updateUser(${user.id})">update</button>
        </td>
    </tr>`
    })
    localStorage.setItem("users", JSON.stringify(users));
}


function deleteUser(param) {
    users = users.filter(user => user.id !== param);
    userAddtoTable(users)
}

function updateUser(param) {
    changeUserBtn.classList.remove("d-none");
    userAddBtn.classList.add("d-none");
    let findedUser = users.find(user => user.id === param);
    fullName.value = findedUser.name
    email.value = findedUser.email
    pass.value = findedUser.password
    findId = param
}

function  refreshForm() {
    fullName.value = ""
    email.value = ""
    pass.value = ""
}


search.addEventListener("keyup", () => {
    let inputVal = search.value.toLowerCase().trim();
    let searchUser = users.filter(user => {
        return user.name.toLowerCase().includes(inputVal)
    })
    userAddtoTable(searchUser)
})


