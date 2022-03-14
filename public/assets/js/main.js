// IIFE
(function(){

    const TWEET_INPUT = document.querySelector('#tweet_input');
    const TWEET_SUBMIT_BTN = document.querySelector('#tweet_submit_btn');
    let tweetList = readDataFromStorage();
    tweetList = [
        {id: 1647216243274, post:"Today is Sunshine, and we'll watch a good movie", createdAt:1647216243274, updatedAt:null},
        {id: 1647216243374, post:"Today is not a Good Day To Watch movie", createdAt:1647216243374, updatedAt:1647216243394},
        {id: 1647216243474, post:"Let's Have Pizzatoday at afternoon", createdAt:1647216243474, updatedAt:null},
        {id: 1647216243574, post:"Bangladesh has won the ICC Champions Trophy Again", createdAt:1647216243574, updatedAt:1647216243677},
        {id: 1647216243674, post:"Such Cool Rainy Day today. Biriyani is the perfect dish for today", createdAt:1647216243674, updatedAt:null},
    ];
    showAllData(tweetList);

    TWEET_INPUT.addEventListener('input',function(e){
        e.preventDefault();
        const characterCount= document.querySelector('#characters');
        const characterMax= document.querySelector('#characters_max');
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

    function readDataFromStorage(){
        if(localStorage.getItem('tweetList')){
            let arr = JSON.parse(localStorage.getItem('tweetList'));
            return arr;
        }else{
            return [];
        }
    }

    function showAllData(arr){
        for(let item of arr){
            console.log(item)
        }
    }



})()