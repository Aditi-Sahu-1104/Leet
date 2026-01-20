document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.querySelector(".stats-card");

  function validateUsername(username) {
    if (username.trim() === "") {
      alert("username should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z0-9_]{3,16}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Inavlid Username");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      searchButton.textContent = "Searching....";
      searchButton.disabled = true;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("unable to fetch the user details");
      }
      const data = await response.json();
      console.log("Logging data: ", data);

      displayUserData(data);
    } catch (error) {
      statsContainer.innerHTML = "<p>No data Found</p>";
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle){
    const progressDegree = (solved/total)*100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }
  function displayUserData(data) {
    const totalques = data.totalQuestions;
    const totaleasyques = data.totalEasy;
    const totalmediumques = data.totalMedium;
    const totalhardques = data.totalHard;

    const solvedTotal = data.totalSolved;
    const easySolved = data.easySolved;
    const medsolved = data.mediumSolved;
    const hardsolved = data.hardSolved;



    updateProgress(easySolved, totaleasyques, easyLabel, easyProgressCircle);
    updateProgress(medsolved, totalmediumques, mediumLabel, mediumProgressCircle);
    updateProgress(hardsolved, totalhardques, hardLabel, hardProgressCircle);

  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("username: ", username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });
});
