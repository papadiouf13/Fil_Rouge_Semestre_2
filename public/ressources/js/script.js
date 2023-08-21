const payement = document.querySelector('#payement');
payement.addEventListener('click', function(event) {
    // alert('SALAM');
    const id_appro = document.querySelector('#id_appro');
    id_appro.value = payement.getAttribute("data-appro");
});