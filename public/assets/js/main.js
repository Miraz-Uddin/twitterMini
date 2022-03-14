// IIFE
(function(){

    // Start your code here
    console.log('JS Connected');

    const TWEET_INPUT = document.querySelector('#tweet_input');
    const TWEET_SUBMIT_BTN = document.querySelector('#tweet_submit_btn');

    TWEET_INPUT.addEventListener('input',function(e){
        e.preventDefault();
        const characterCount= document.querySelector('#characters');
        const characterMax= document.querySelector('#characters_max');
        const tweetubmit_btn= document.querySelector('#tweet_submit_btn');
        characterCount.textContent = this.value.length; 

        if(tweetMaxCount(this.value.length,characterMax.textContent)){
            this.style.border = '2px solid green';
            TWEET_SUBMIT_BTN.classList.remove('d-none');
        }else{
            this.style.border = '2px solid red';
            TWEET_SUBMIT_BTN.classList.remove('d-none');
            TWEET_SUBMIT_BTN.classList.add('d-none');
        }

    });

    function tweetMaxCount(inputLength, count){
        if(inputLength>parseInt(count))
            return false;
        return true;
    }



})()