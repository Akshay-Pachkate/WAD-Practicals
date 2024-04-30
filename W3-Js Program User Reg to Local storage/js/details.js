
document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users);

    
    users.forEach((user, index) => {
        var table = document.getElementById('userTable');
        
        var row = `
            <td> <img src="${user.profilePhoto}"  height="40px" width="40px"> </td>
            <td>${user.fname + " " + user.lname}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.gender}</td>
            <td>${user.age}</td>
        `

        table.innerHTML += row;
    })
})
    
    