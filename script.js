const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const refreshText = document.getElementById("refresh");

refreshText.hidden = true;

function showLoadingRipple() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingRipple() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote() {
    const proxyUrl = "https://cors-everywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    showLoadingRipple();
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // Reduce Font size for long quotes
        if (data.quoteText.length > 70) {
            quoteText.classList.add("long-quote-sm");
        } else if (data.quoteText.length > 150) {
            quoteText.classList.add("long-quote-md");
        } else if (data.quoteText.length > 350) {
            quoteText.classList.add("long-quote-lg");
        } else {
            quoteText.removeAttribute("class");
        }
        // If the Author is blank, replace 'Unknown'
        if (data.quoteAuthor === "") {
            quoteAuthor.innerText = "Unknown";
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        quoteText.innerText = data.quoteText;
        hideLoadingRipple();
    } catch (error) {
        console.log("oops");
        if (refreshText) {
            refreshText.hidden = false;
        }
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners 
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

// On Load
getQuote();