// Flash message element
const errorMessage = document.querySelector('.error')
const info = document.querySelector('.info')

if(errorMessage.innerHTML !== '' || info.innerHTML !== ''){
    setTimeout(function(){
      errorMessage.innerHTML = '';
      info.innerHTML = '';
    }, 3500);
}