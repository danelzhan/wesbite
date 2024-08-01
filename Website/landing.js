// landing
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const textBox = document.getElementById('text');
const websiteButton = document.getElementById('website');

yesButton.addEventListener("click", function() {
    landingLogicYes();
});

noButton.addEventListener("click", function() {
    landingLogicNo();
});  

function landingLogicYes () {

    yesButton.style.transform = "scale(1, 1)";
    noButton.style.transform = "scale(1, 1)";
    noAmount = 0;

    if (textBox.innerHTML == "hi ivy!") {
        textBox.innerHTML = "btww are we dating?";
        yesButton.innerHTML = "yess :D";
        noButton.innerHTML = "no i hate u";
    } else if (textBox.innerHTML == "btww are we dating?") {
        textBox.innerHTML = "yayy ok since we're dating and its national girlfriend day i wanna get u a gift";
        yesButton.innerHTML = "okay!!";
        noButton.innerHTML = "nah i'm good";
    } else if (noButton.innerHTML == "nah i'm good") {
        textBox.innerHTML = "so i made u this rrly cool website go look! (turn up sound and scroll pls)";
        yesButton.style.display = "none";
        noButton.style.display = "none";
        websiteButton.style.display = "flex";
    }
}

var noAmount = 0;
function landingLogicNo () {
    if (textBox.innerHTML == "hi ivy!" || textBox.innerHTML == "are we dating?" || noButton.innerHTML == "nah i'm good") {
        noAmount++;
        yesButton.style.transform = "scale(" + Math.pow(1.5, noAmount) + ", " + Math.pow(1.5, noAmount) + ")";
        noButton.style.transform = "scale(" + Math.pow(0.75, noAmount) + ", " + Math.pow(0.75, noAmount) + ")";
    } else if (textBox.innerHTML == "i have a question") {
        textBox.innerHTML = "btww are we dating?";
        yesButton.innerHTML = "yess :D";
        noButton.innerHTML = "no i hate u";
    }
}
