const main_img = document.querySelector('.img-principal');
const secondary_imgs = document.querySelectorAll('.img-secundaria');

secondary_imgs.forEach(img => {
    img.addEventListener('click', function() {
        const active = document.querySelector('.active');
        active.classList.remove('active');
        this.classList.add('active');
        main_img.src = this.src;
    })
})

const button_tallas = document.querySelectorAll('.button-tallas')

let selectedButton = null;

button_tallas.forEach(btn => {
    btn.addEventListener('click', function() {

        /*const btn_selected = document.querySelector('.btn-selected');
        btn_selected.classList.add('button-selected');
        btn_selected.classList.remove('btn-selected')

        this.classList.toggle('button-selected');
        this.classList.toggle('btn-selected')

        btn_selected.classList.remove('button-selected');*/

        if (selectedButton !== null) {
            selectedButton.style.backgroundColor = "#ffffff";
            selectedButton.style.color = "#000000"
        }

        selectedButton = btn;
        btn.style.backgroundColor = "#000000";
        btn.style.color = "#ffffff"
    })

})
