// Flash message element
const errorMessage = document.querySelector('.error')

if(errorMessage.innerHTML !== ''){
    setTimeout(function(){
      errorMessage.innerHTML = '';
    }, 3500);
}