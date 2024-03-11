document.addEventListener("DOMContentLoaded", function() { //event listener to see if someone clicks the mumei icon

    var image = document.getElementById("clickableImage");

    /*function playNoise() {
        
        const e = randomNumber(1,3);
        let t = e.toString();
        const r = new Audio(`sounds/hi-${t}.mp3`);
        r.volume = .7;
        r.play();
    }*/

    function playNoise() {
        const r = new Audio(`sounds/hi-1.mp3`);
        r.volume = .7;
        r.play();
    }

    function randomNumber(x, y){
        return Math.floor(Math.random()*y) + x;
    }

    image.addEventListener("click", playNoise);
    /*image.addEventListener("click", () => {
        playNoise();
        updateSubscriberCountMumei();
    });*/
});
document.addEventListener("DOMContentLoaded", function() { //event listener for input key field & button
    
    const apiKey = getCookie("apiKey"); //get api key from cookie
    
    if(apiKey) { //if have api key, hide input field
        document.getElementById("apiKeyInputContainer").style.display = "none";
    }

    document.getElementById("apiKeySubmitButton").addEventListener("click", function() { //button event listener, saves api key and hides input field
        const apiKeyInput = document.getElementById("apiKeyInputBox").value;

        setCookie("apiKey", apiKeyInput, 365);

        document.getElementById("apiKeyInputContainer").style.display = "none";

        updateSubscriberCountMumei();
    });
});

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * days));
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toUTCString() + ";path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if(cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}
