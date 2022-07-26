var firebaseConfig = {
    apiKey: "AIzaSyBsMI71VzmTGHXrY-TyFnxwlEU2tPD0MIQ",
    authDomain: "arthurpereira-site.firebaseapp.com",
    projectId: "arthurpereira-site",
    storageBucket: "arthurpereira-site.appspot.com",
    messagingSenderId: "180573853774",
    appId: "1:180573853774:web:fa4626bee558d1345d8b1f",
    measurementId: "G-DLPEJX8T8Y"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function() {
    const nodes = document.getElementsByClassName('question')
    for (var i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        node.addEventListener('click', function() {
            showAnswer(node)
        })
    }
    const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoPlay: true,
        slidesPerView: 3,
        spaceBetween: 10,
        breakpoints: {
            720: {
                slidesPerView: 5
            }
        }
    });
    swiper.autoplay.start();

    const modal = document.getElementById('modal-enjamento')

    const buyButtons = document.getElementsByClassName('buy')
    for (var i = 0; i < buyButtons.length; i++) {
        const buyButton = buyButtons[i]
        buyButton.addEventListener('click', () => {
            document.getElementById('emailInput').value = ''
            modal.classList.add('is-active')
        })
    }
    

    const closeModalButton = document.getElementById('modal-enjamento-close')
    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('is-active')
    })

    const checkoutButton = document.getElementById('modal-enjamento-checkout')
    checkoutButton.addEventListener('click', () => {
        const inputEmail = document.getElementById('emailInput')
        const email = inputEmail.value
        if (validateEmail(email)) {
            db.collection('leads').add({
                email
            })
            window.open(`https://pay.hotmart.com/T70647082K?split=12&email=${email}`, '_blank')
            modal.classList.remove('is-active')
        } else {
            document.getElementById('help-email').classList.remove('is-hidden')
            inputEmail.classList.add('is-danger')
        }
    })
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const showAnswer = function(node) {
    const icon = node.children[1].children[0].children[0]
    const element = node.parentElement.children[1]
    if (element.classList.contains('visible-answer')) {
        element.classList.remove('visible-answer')
        element.classList.add('invisible-answer')
        icon.classList.remove(icon.classList[0])
        icon.classList.add('icofont-plus')
    } else {
        element.classList.remove('invisible-answer')
        element.classList.add('visible-answer')
        icon.classList.remove(icon.classList[0])
        icon.classList.add('icofont-minus')
    }
}

/*
const removeAllVisibleAnswer = function() {
    const nodes = document.getElementsByClassName('visible-answer')
    for (var i = 0; i < nodes.length; i++) {
        const icon = nodes[i].parentElement.children[0].children[1].children[0].children[0]
        nodes[i].classList.add('invisible-answer')
        nodes[i].classList.remove('visible-answer')
        icon.classList.remove(icon.classList[0])
        icon.classList.add('icofont-arrow-down')
    }
}
*/
