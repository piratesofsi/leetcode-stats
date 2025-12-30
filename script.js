document.addEventListener("DOMContentLoaded", function () {
  // DomcontentLoaded is a browser event which get fired when all the content on the dom is loaded
  // so if some of div or anything is not loaded and if fired then js
  // then it can throw an error
  // so first load everything then use it

  const usernameinput = document.getElementById("user-name");
  const searchbtn = document.getElementById("search-btn");
  const easycircle = document.querySelector(".easy");
  const mediumcircle = document.querySelector(".medium");
  const hardcircle = document.querySelector(".hard");
  const easylabel = document.getElementById("easylabel");
  const mediumlabel = document.getElementById("mediumlabel");
  const hardlabel = document.getElementById("hardlabel");
  const cardstats = document.querySelector(".statsCards");
  const statscontainer = document.querySelector(".stats");
  const errorMsg = document.getElementById("error-msg");
  const container = document.querySelector(".Container");
  container.classList.add("compact");
  container.classList.remove("expanded");
  const totalSolvedEl = document.getElementById("total-solved");
const rankingEl = document.getElementById("easy-solved");
const acceptanceRateEl = document.getElementById("medium-solved");
const reputationEl = document.getElementById("reputation");
const refreshBtn = document.getElementById("refresh-btn");

  document.querySelector(".statscircle").style.visibility = "hidden";
  //   when i click the search i should get the data
  searchbtn.addEventListener("click", function () {
    const username = usernameinput.value;
    console.log("logging username" + username);
    // so the username is valid is valid as it return true
    // so we can user the fetch api to get the userdata from leetcode
    if (validateusername(username)) {
      fetchuserdetails(username);
    }
  });

  function validateusername(username) {
    if (username.trim() == "") {
      alert("username cannot be empty!!");
      return false;
    }
    const regex = /^[a-z0-9_]{3,16}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("invalid username!!!");
      return false;
    }
    return isMatching;
  }

  async function fetchuserdetails(username) {
    const url = "https://leetcode-stats-api.herokuapp.com/" + username;
    try {
      searchbtn.textContent = "searching";
      searchbtn.disabled = true;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("user details not found ");
      }
      const data = await response.json();
      container.style.height = "490px";

      container.classList.remove("compact");
      container.classList.add("expanded");
      refreshBtn.classList.remove("hidden");

      document.querySelector(".statscircle").style.visibility = "visible";

      console.log("logging data : ", data);
      passinguserdata(data);
    } catch (error) {
      errorMsg.textContent = "no data found";
      container.style.height = "220px";

      container.classList.add("compact");
      container.classList.remove("expanded");
      refreshBtn.classList.add("hidden");

      document.querySelector(".statscircle").style.visibility = "hidden";
    } finally {
      searchbtn.textContent = "search";
      searchbtn.disabled = false;
    }
  }

  function passinguserdata(data) {
    const totalquestion = data.totalQuestions;
    const totalSolved = data.totalSolved;
    const easysolved = data.easySolved;
    const mediumsolved = data.mediumSolved;
    const hardsolved = data.hardSolved;
    const totaleasy = data.totalEasy;
    const totalmedium = data.totalMedium;
    const totalhard = data.totalHard;
    

    const Ranking = data.ranking;
    const acceptanceRate=data.acceptanceRate;
    const reputation=data.reputation;
    updatecircle(easycircle, easylabel, easysolved, totaleasy);
    updatecircle(mediumcircle, mediumlabel, mediumsolved, totalmedium);
    updatecircle(hardcircle, hardlabel, hardsolved, totalhard);
     updatecard(totalSolved,totalSolvedEl);
     updatecard(`#${data.ranking.toLocaleString()}`,rankingEl);
     updatecard(`${data.acceptanceRate.toFixed(2)} %`,acceptanceRateEl);
     updatecard(reputation,reputationEl);
      
  }

  function updatecircle(circle, label, solved, total) {
    const progress = (solved / total) * 100;
    circle.style.setProperty("--percentageofquestion", `${progress}%`);
    label.textContent = `${solved}/${total}`;
    label.style.paddingTop = "18px";
  }

  function updatecard(value,element){
    element.textContent=value;
  }
refreshBtn.addEventListener("click", () => {
 container.style.height = "220px";
       
      container.classList.add("compact");
      container.classList.remove("expanded");
      refreshBtn.classList.add("hidden");
      usernameinput.value="";
      document.querySelector(".statscircle").style.visibility = "hidden";
});

  
});
