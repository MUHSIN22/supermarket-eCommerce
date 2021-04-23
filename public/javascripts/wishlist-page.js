$('document').ready(function(){
    $('.heart-wishlist').on('click',(event) => {
        let product = event.target.id
        event.preventDefault()
        event.target.classList.toggle('fas')
        $.ajax({
            url:'/add-or-remove-wishlist',
            method : 'post',
            data : {product},
            success : (response) => {
                console.log(response.status);
                if(response.status){
                    console.log('product removed');
                    location.reload()
                }
            }
        })
    })
})
