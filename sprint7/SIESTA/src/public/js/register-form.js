const isEmpty = (input) => input.value && input.value.trim() !== "";
const isEmail = (input) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) {
        return true;
    } else {
        return false;
    }
};

const validations = [
    {
        inputName: "email",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "El email no puede estar vacío"
            },
            {
                validator: isEmail,
                errorMsg: "Debe ingresar un formato de email válido"
            }
        ]
    },
    {
        inputName: "password",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "La contraseña no puede estar vacía"
            },
            {
                validator: (input) => input.value.length >= 8,
                errorMsg: "La contraseña debe tener al menos 8 caracteres"
            }
        ]
    },
    {
        inputName: "first_name",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "El nombre no puede estar vacío"
            },
            {
                validator: (input) => input.value.length >= 2,
                errorMsg: "El nombre debe tener al menos 2 caracteres"
            }
        ]
    },
    {
        inputName: "last_name",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "El apellido no puede estar vacío"
            },
            {
                validator: (input) => input.value.length >= 2,
                errorMsg: "El apellido debe tener al menos 2 caracteres"
            }
        ]
    }
];

window.addEventListener('load', function() {

    let form = document.querySelector('.datos');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const errors = [];

        validations.forEach((inputToValidate) => {
            const input = form[inputToValidate.inputName];

            for (const validation of inputToValidate.validations) {
                const isValid = validation.validator(input);
                if (!isValid) {
                    errors.push(validation.errorMsg);
                    console.log(errors)
                    input.parentElement.querySelector('.error-msg').innerHTML = `<i class='fas fa-exclamation-triangle'></i> ${validation.errorMsg}`;
                    input.parentElement.querySelector('.error-msg').classList.add('submit-invalid');
                    return
                }
            }
            document.querySelector('.validation-register-errors').innerText = ``;
        })

        if (errors.length == 0) {
            form.submit();
        } else {
            console.log(errors)
        }
    });



    let inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        
        let errorMsg = document.querySelector('#error-' + input.name)

        input.addEventListener('blur', function(e) {

            if (input.value == '') {

                input.style.borderBottomColor = "red"

                errorMsg.innerHTML = 'El campo es obligatorio';
                errorMsg.style.display = 'block'
                errorMsg.classList.add('is-invalid')

            } else if ((!(input.name == 'password') && !(input.name == 'email')) && input.value.length < 2) {

                input.style.borderBottomColor = "red"

                errorMsg.innerHTML = 'El campo debe tener al menos 2 caracteres';
                errorMsg.style.display = 'block'
                errorMsg.classList.add('is-invalid')

            } else if (input.name == 'email') {

                if (!input.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                    input.style.borderBottomColor = "red"

                    errorMsg.innerHTML = 'Debe ingresar un formato de email válido';
                    errorMsg.style.display = 'block'
                    errorMsg.classList.add('is-invalid')
                } else {
                    input.style.borderBottomColor = "black"

                    errorMsg.style.display = 'none'
                }

            } else if (input.name == 'password') {

                if (input.value.length < 8) {

                    input.style.borderBottomColor = "red"

                    errorMsg.innerHTML = 'La contraseña debe tener al menos 8 caracteres';
                    errorMsg.style.display = 'block'
                    errorMsg.classList.add('is-invalid')

                } else {
                    input.style.borderBottomColor = "black"

                    errorMsg.style.display = 'none'
                }

            } else {
                input.style.borderBottomColor = "black"

                errorMsg.style.display = 'none'
            }


        })

    });

})