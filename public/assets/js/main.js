// IIFE
(function () {
  const TWEET_INPUT = document.querySelector("#tweet_input");
  const TWEET_SUBMIT_BTN = document.querySelector("#tweet_submit_btn");
  const TWEET_LIST_PARENT = document.querySelector("#tweet_list_parent");
  const NEW_TWEET = document.querySelector("#newTweet");
  const TWEET_POSTED_TIME = document.querySelector("#tweet_posted_time");
  const NEW_TWEET_SUBMIT_BTN = document.querySelector("#new_tweet_submit_btn");
  const UPDATE_BUTTON = document.querySelector("#updateButton");
  const editTweetModal = new bootstrap.Modal(
    document.getElementById("editTweetModal"),
    { keyboard: false }
  );

  showAllData();

  TWEET_INPUT.addEventListener("input", function (e) {
    e.preventDefault();
    const characterCount = document.querySelector("#characters");
    const characterMax = document.querySelector("#characters_max");
    characterCount.textContent = this.value.length;
    this.style.border = "2px solid green";
    TWEET_SUBMIT_BTN.classList.remove("d-none");
    if (!tweetMaxCount(this.value.length, characterMax.textContent)) {
      this.style.border = "2px solid red";
      TWEET_SUBMIT_BTN.classList.add("d-none");
    }
  });

  NEW_TWEET.addEventListener("input", function (e) {
    e.preventDefault();
    const characterCount = document.querySelector("#newCharacters");
    const characterMax = document.querySelector("#newCharacters_max");
    characterCount.textContent = this.value.length;
    this.style.border = "2px solid green";
    NEW_TWEET_SUBMIT_BTN.classList.remove("d-none");
    if (!tweetMaxCount(this.value.length, characterMax.textContent)) {
      this.style.border = "2px solid red";
      NEW_TWEET_SUBMIT_BTN.classList.add("d-none");
    }
  });

  TWEET_SUBMIT_BTN.addEventListener("click", function (e) {
    e.preventDefault();
    const TWEET_INPUT = document.querySelector("#tweet_input");
    storeTweetToStorage(TWEET_INPUT.value);
    showAllData();
    clearInputField();
  });

  UPDATE_BUTTON.addEventListener("click", function (e) {
    e.preventDefault();
    const EDITABLE_ID = document.querySelector("#editable_tweet_id");
    updateTweetInStorage(EDITABLE_ID.value);
    showAllData();
    editTweetModal.hide();
  });

  TWEET_LIST_PARENT.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("deleteButton"))
      deleteTweetFromStorage(e.target.parentElement.id.split("-")[1]);
    if (e.target.classList.contains("editButton"))
      setClickedTweetInModal(
        e.target.parentElement.parentElement.parentElement.parentElement.id.split(
          "-"
        )[1]
      );
  });

  function tweetMaxCount(inputLength, count) {
    if (inputLength > parseInt(count)) return false;
    return true;
  }

  function readTweetsFromStorage() {
    if (localStorage.getItem("tweetList")) {
      let arr = JSON.parse(localStorage.getItem("tweetList"));
      return arr;
    } else {
      return [];
    }
  }

  function storeTweetToStorage(postTitle) {
    const tweetPost = {
      id: Date.now(),
      post: postTitle,
      createdAt: Date.now(),
      updatedAt: null,
    };
    let arr = [];
    if (localStorage.getItem("tweetList"))
      arr = JSON.parse(localStorage.getItem("tweetList"));
    arr.push(tweetPost);
    localStorage.setItem("tweetList", JSON.stringify(arr));
  }

  function setClickedTweetInModal(id) {
    const objValue = getTweetFromStorage(id);
    const i = objValue.index;
    let tweets = objValue.arr;
    NEW_TWEET.value = "";
    NEW_TWEET.value = tweets[i].post;
    const characterCount = document.querySelector("#newCharacters");
    characterCount.textContent = 0;
    characterCount.textContent = tweets[i].post.length;
    const EDITABLE_ID = document.querySelector("#editable_tweet_id");
    EDITABLE_ID.value = tweets[i].id;
    TWEET_POSTED_TIME.innerHTML = "";
    TWEET_POSTED_TIME.innerHTML = milisecondsToHumanReadableDateConvert(
      tweets[i].createdAt
    );
  }

  function updateTweetInStorage(idToUpdate) {
    const objValue = getTweetFromStorage(idToUpdate);
    const i = objValue.index;
    let tweets = objValue.arr;
    tweets[i].post = NEW_TWEET.value;
    tweets[i].updatedAt = Date.now();
    if (localStorage.getItem("tweetList")) localStorage.removeItem("tweetList");
    localStorage.setItem("tweetList", JSON.stringify(tweets));
  }

  function deleteTweetFromStorage(id) {
    const objValue = getTweetFromStorage(id);
    const i = objValue.index;
    let tweets = objValue.arr;
    tweets.splice(i, 1);
    if (localStorage.getItem("tweetList")) localStorage.removeItem("tweetList");
    localStorage.setItem("tweetList", JSON.stringify(tweets));
    showAllData();
  }

  function getTweetFromStorage(idToFind) {
    let arr = readTweetsFromStorage();
    let index = arr.findIndex((a) => a["id"] == idToFind);
    return { index, arr };
  }

  function showAllData() {
    let arr = readTweetsFromStorage();
    let count = 0;
    let tweets = "";
    if(arr.length == 0){
      tweets = `
      <li class="p-3">
          <div class="d-flex justify-content-center">
            <p style="color: #1DA1F2; font-size:1.8rem">No Tweets Found</p>
          </div>
      </li>
      `;
    }else{
      for (let i = arr.length - 1; i >= 0; i--) {
        let time = `was created on ${milisecondsToHumanReadableDateConvert(
          arr[i]["createdAt"]
        )}`;
        if (arr[i]["updatedAt"])
          time = `was updated on ${milisecondsToHumanReadableDateConvert(
            arr[i]["updatedAt"]
          )}`;
        tweets += `<li class="item" id="item-${
          arr[i]["id"]
        }"><div class="d-flex justify-content-between"><div class="d-flex justify-content-between">
        <p class="d-flex" style="align-items: center; padding: 0 1rem 0 0;">${++count}</p><div class="text_parent">
        <button type="button" data-bs-toggle="modal" data-bs-target="#editTweetModal" class="editButton" title="Click to Edit Tweet">${
          arr[i]["post"]
        }</button>
        <p class="time">This tweet ${time}</p></div></div><p><button type="button" class="btn deleteBtn">
        <i class="fa fa-times deleteButton" aria-hidden="true"></i></button></p></div></li>`;
      }
    }
    TWEET_LIST_PARENT.innerHTML = "";
    TWEET_LIST_PARENT.insertAdjacentHTML("afterbegin", tweets);
  }

  function milisecondsToHumanReadableDateConvert(num) {
    const main = new Date(num);
    const date = toOrdinalSuffix(main.getDate());
    const month = main.toLocaleString("default", { month: "long" });
    const year =
      main.getFullYear() < 10 ? "0" + main.getFullYear() : main.getFullYear();
    const hour = main
      .toLocaleString("en-US", { hour: "numeric", hour12: true })
      .split(" ");
    const minute =
      main.getMinutes() < 10 ? "0" + main.getMinutes() : main.getMinutes();
    return `${date} ${month}, ${year} at ${
      hour[0]
    }:${minute}${hour[1].toLowerCase()}`;
  }

  function toOrdinalSuffix(num) {
    const int = parseInt(num),
      digits = [int % 10, int % 100],
      ordinals = ["st", "nd", "rd", "th"],
      oPattern = [1, 2, 3, 4],
      tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
    return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
      ? int + "<sup>" + ordinals[digits[0] - 1] + "</sup>"
      : int + "<sup>" + ordinals[3] + "</sup>";
  }

  function clearInputField() {
    TWEET_INPUT.value = "";
    const characterCount = document.querySelector("#characters");
    characterCount.textContent = 0;
  }
})();
