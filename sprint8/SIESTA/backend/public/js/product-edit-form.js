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
    /*{
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
    },*/
    {
        inputName: "price",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "Este campo no puede estar vacio"
            },
            {
                validator: (input) => input.value >= 5000,
                errorMsg: "El precio debe ser mayor o igual a 5000"
            }
            
        ]
    }
];

window.addEventListener('load', function() {

    let form = document.querySelector('.form-edit form');
    let textarea = document.querySelector('#desc-textarea');

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
    
})