const isEmpty = (input) => input.value && input.value.trim() !== "";
function hasExtension(input, exts) {
    exts = ['.jpg', '.gif', '.png', '.jpeg'];
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(input.value)
}

const validations = [
    {
        inputName: "name",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "El nombre del producto no puede estar vacío"
            },
            {
                validator: (input) => input.value.length >= 5,
                errorMsg: "El nombre del producto debe tener al menos 5 caracteres"
            }
        ]
    },
    {
        inputName: "image",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "Las imagenes no pueden estar vacías"
            },
            {
                validator: hasExtension,
                errorMsg: "El formato de las imagenes debe ser .jpg, .gif, .png o .jpeg"
            }
        ]
    },
   /* {
        inputName: "color",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "El campo 'color' no puede estar vacío"
            }
        ]
    },
    {
        inputName: "size",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "El campo 'talles' no puede estar vacío"
            }
        ]
    },
    {
        inputName: "price",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "El campo 'precio' no puede estar vacio"
            },
            {
                validator: (input) => input.value >= 5000,
                errorMsg: "El precio debe ser mayor o igual a 5000"
            }
            
        ]
    }*/
];

window.addEventListener('load', function() {

    let form = document.querySelector('.form-create form');
    let textarea = document.querySelector('#textarea');

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
            input.parentElement.querySelector('.error-msg').innerText = null;
            input.parentElement.querySelector('.error-msg').classList.remove('submit-invalid');
        })
        let textareaMsg = ['La descripción no puede estar vacía', 'La descripción debe tener al menos 20 caracteres']

            if (textarea.value == '') {
                errors.push(textareaMsg[0]);

                textarea.parentElement.querySelector('.error-msg').innerHTML = `<i class='fas fa-exclamation-triangle'></i> ${textareaMsg[0]}`;
                textarea.parentElement.querySelector('.error-msg').classList.add('submit-invalid');

            } else if (textarea.value.length < 20) {
                errors.push(textareaMsg[1]);

                textarea.parentElement.querySelector('.error-msg').innerHTML =`<i class='fas fa-exclamation-triangle'></i> ${textareaMsg[1]}`;
                textarea.parentElement.querySelector('.error-msg').classList.add('submit-invalid');
            } else {
                textarea.parentElement.querySelector('.error-msg').innerText = null;
                textarea.parentElement.querySelector('.error-msg').classList.remove('submit-invalid');
            }
    
        if (errors.length == 0) {
            form.submit();
        } else {
            console.log(errors)
        }
    });


    let nombre = document.getElementById ('nombre');
    nombre.addEventListener('click', function(e) {
        e.preventDefault();

        let error = document.getElementById('error');

        if (nombre.value.length == '') {

            nombre.style.borderColor = "red"
            error.innerHTML = 'El campo es obligatorio';
            error.classList.add('is-invalid')

        } else if (nombre.value.length < 8) {
            
            nombre.style.borderColor = "red"
            error.innerHTML = 'El campo debe tener al menos 8 digitos';
            error.classList.add('is-invalid')

        } else {

            nombre.style.borderColor = "black"
            error.style.display = 'none'
            return
        };

        let textarea = document.getElementById('textarea');
        textarea.addEventListener('click', function(e) {
        e.preventDefault();
        let msg = ['Debes llenar el campo "descripción"', 'La descripción debe tener al menos 20 caracteres']

        if (textarea.value.length == '') {
            textarea.style.borderColor = "red"
            textarea.parentElement.querySelector('.error-msg').innerHTML =`${msg[0]}`;
            textarea.parentElement.querySelector('.error-msg').classList.add('is-invalid');

        } else if (textarea.value.length < 20) {
            textarea.style.borderColor = "red"
            textarea.parentElement.querySelector('.error-msg').innerHTML =`${msg[1]}`;
            textarea.parentElement.querySelector('.error-msg').classList.add('is-invalid');
        } else {
            textarea.style.borderColor = "black"
            textarea.parentElement.querySelector('.error-msg').innerText = null;
            textarea.parentElement.querySelector('.error-msg').classList.remove('is-invalid');
        }
        })
    });


})