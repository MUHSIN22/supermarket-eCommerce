
$('document').ready(function () {
    let defaultPricing = $('#default-pricing');
    let customPricing = $('#custom-pricing');
    let defaultPricingContainer = $('.product-price-container');
    let customPricingContainer = $('.product-custom-prize-container')
    let categoryList = $('#category-list');
    let categoryButton = $('#product-category')
    let pricingSwitch = (type, onContainer, offContainer) => {
        type.on('click', function () {
            offContainer.css('display', 'none')
            onContainer.css('display', 'flex')
        })
    }
    categoryButton.on('click',function(e){
        e.preventDefault();
        categoryList.css('display','block');
    })
    categoryList.find('li').on('click',function(event){
        var value = $(event.target).html()
        categoryButton.html('Category : '+value)
        $('.category-save').val(value)
        categoryList.css('display','none')
    })
    $
    pricingSwitch(defaultPricing, defaultPricingContainer, customPricingContainer);
    pricingSwitch(customPricing, customPricingContainer, defaultPricingContainer);
    
    $('#images').on('change',function(){
        var totalImages = $('.images').length;
        for(var i=0;i<totalImages;i++){
            $('#image-preview').append("<img src='"+URL.createObjectURL(event.target.files[i])+"'>");
        }
    })
})
