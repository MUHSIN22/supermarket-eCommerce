$('document').ready(function(){
    var dashboardBtn = $('#dashboard')
    var addProductBtn = $('#add-product')
    var viewProductBtn = $('#view-product')
    var orderDetailsBtn = $('#order-details')
    var availableLocationBtn = $('#available-locations')
    var deliveryPersonBtn = $('#delivery-person')
    var adminDashboard = $('.admin-dashboard-container')
    var adminOrder = $('.admin-order-container')
    removeActiveClass = () => {
        $('.active-admin-option').removeClass('active-admin-option')
    }
    addActiveClass = (button) => {
        button.addClass('active-admin-option')
    }
    viewPage = (page) => {
        var pages = [adminOrder,adminDashboard]
        for(var i=0;i<2;i++){
            pages[i].css('display','none')
        }
        page.css('display','flex')
    }
    btnClick = (button) => {
        button.on('click',function(){
            removeActiveClass();
            addActiveClass(button);
            if(button == dashboardBtn){
                viewPage(adminDashboard);
            }else if(button == orderDetailsBtn){
                viewPage(adminOrder);
            }
        })
    }
    adminDashboard.css('display','flex')
    dashboardBtn.addClass('active-admin-option')
    btnClick(dashboardBtn);
    btnClick(addProductBtn);
    btnClick(viewProductBtn);
    btnClick(orderDetailsBtn);
    btnClick(availableLocationBtn);
    btnClick(deliveryPersonBtn);
})
