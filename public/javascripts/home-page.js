$('document').ready(function(){
    $('.heart').on('click',(event) => {
        let product = event.target.id
        event.target.classList.toggle('fas')

        $.ajax({
            url:'/add-or-remove-wishlist',
            method : 'post',
            data : {product},
            success : (response) => {
                if(!response.status){
                    location.href = '/login'
                }
            }
        })
    })
})