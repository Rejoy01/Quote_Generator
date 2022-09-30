const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBTn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote')
const loader  = document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
    
}

//show new quote
function newQuote(){
    loading();
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // if author field is blank and replace it with unknown
    if (!quote.author){
        authorText.textContent = "unknown";
    }else{
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if (quote.text.length>100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set quote , hide loader
    
    quoteText.textContent = quote.text;
    complete();
}
//Get Quotes from API

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';   
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }  catch (error){
        //catch error
    }
}
// tweet quotes
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBTn.addEventListener('click',tweetQuote);

// on load
getQuotes();

