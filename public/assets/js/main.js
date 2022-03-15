// IIFE
(function(){

    const TWEET_INPUT = document.querySelector('#tweet_input');
    const TWEET_SUBMIT_BTN = document.querySelector('#tweet_submit_btn');
    const TWEET_LIST_PARENT = document.querySelector('#tweet_list_parent');
    let tweetList = readDataFromStorage();
    tweetList = [
        {id: 1647216243000, post:"Today is Sunshine, and we'll watch a good movie", createdAt:1647216243000, updatedAt:null},
        {id: 1647286243000, post:"Today is not a Good Day To Watch movie", createdAt:1647286243000, updatedAt:1647296243000},
        {id: 1647096243000, post:"Let's Have Pizzatoday at afternoon", createdAt:1647096243000, updatedAt:null},
        {id: 1645096243000, post:"Bangladesh has won the ICC Champions Trophy Again", createdAt:1645096243000, updatedAt:null},
        {id: 1635096243000, post:"Such Cool Rainy Day today. Biriyani is the perfect dish for today", createdAt:1635096243000, updatedAt:1646096243000},
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
        let count = 0;
        let tweets = '';
        for(let item of arr){
            let time = `was created at ${milisecondsToDateConvert(item['createdAt'])}`;
            if(item['updatedAt'])
                time = `was updated at ${milisecondsToDateConvert(item['updatedAt'])}`;
            tweets+=`<li class="item" id="item-${item['id']}"><div class="d-flex justify-content-between">
            <div class="d-flex justify-content-between"><p class="d-flex" style="align-items: center; padding: 0 1rem 0 0;">${++count}</p>
            <div class="text_parent"><button type="button" data-bs-toggle="modal" data-bs-target="#editTweetModal" 
            style="background:none;padding:0;border:none;color:#00741f">${item['post']}</button>
            <p class="time">This tweet ${time}</p></div></div><p><button type="button" class="btn deleteBtn">
            <i class="fa fa-times" aria-hidden="true"></i></button></p></div></li>`;
        }
        TWEET_LIST_PARENT.insertAdjacentHTML('afterbegin',tweets);
    }

    function milisecondsToDateConvert(num){
        const main = new Date(num);
        const date = main.getDate()<10?'0'+main.getDate():main.getDate() 
        const month = main.getMonth()<10?'0'+main.getMonth():main.getMonth(); 
        const year = main.getFullYear()<10?'0'+main.getFullYear():main.getFullYear(); 
        const hour = main.getHours()<10?'0'+main.getHours():main.getHours();
        const minute = main.getMinutes()<10?'0'+main.getMinutes():main.getMinutes();
        const second = main.getSeconds()<10?'0'+main.getSeconds():main.getSeconds();
        return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    }

    function dateToMilisecondsConvert(str){
        let arr =  str.split(/[\s]/g).join(',').split(/[,:-]/g);
        return Date.parse(new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]))
    }


})()