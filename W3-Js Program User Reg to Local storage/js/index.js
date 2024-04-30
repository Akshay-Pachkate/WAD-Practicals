document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const imageInput = document.getElementById('photo');
    var profile;

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            profile = reader.result;
        }
    })
    

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const male = document.getElementById('male').value;
        const female = document.getElementById('female').value;
        const age = document.getElementById('age').value;

        if(fname == "" || lname == "" || email == "" || address == "" || phone == "" || age == ""){
            alert("Please fill all the fields!");
            return;
        }else{
            const user = {fname, lname, email, address, phone, age, profilePhoto: profile, gender: male ? male : female};
            
            // Clear the form
            document.getElementById('fname').value = "";
            document.getElementById('lname').value = "";
            document.getElementById('email').value = "";
            document.getElementById('address').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('age').value = "";
            

            
            console.log(user);
            // store as array of objects
            let usersInfo = JSON.parse(localStorage.getItem('users')) || [];            
            let users = [user, ...usersInfo];

            localStorage.setItem('users', JSON.stringify(users));            
            alert("Form submitted successfully!");
            window.location.href = "details.html";
        }

    })
    
})