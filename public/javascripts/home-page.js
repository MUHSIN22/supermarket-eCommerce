$('document').ready(function(){
    $('.heart').on('click',(event) => {
        let product = event.target.id
        console.log(product);
        event.target.classList.toggle('fas')
        $.ajax({
            url:'/add-or-remove-wishlist',
            method : 'post',
            data : {product},
            success : (respose) => {
                console.log('added');
            }
        })
    })
})