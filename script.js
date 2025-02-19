document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news");
  const closeButton = document.createElement("button"); // Create close button dynamically
  closeButton.textContent = "x";
  closeButton.classList.add("close-btn");

  const audio = document.getElementById("radioSound"); // Get audio element

  closeButton.addEventListener("click", function () {
    newsContainer.classList.add("hidden"); // Hide message box when clicked
    audio.pause(); // Stop the audio
    audio.currentTime = 0; // Reset audio to the beginning
  });

  function startNews() {
    let names = document
      .getElementById("nameInput")
      .value.split("\n")
      .map((n) => n.trim())
      .filter((n) => n);
    if (names.length === 0) {
      alert("Enter at least one name!");
      return;
    }
    let chosenOne = names[Math.floor(Math.random() * names.length)];

    let messages = [
      `BREAKING NEWS!\n${chosenOne} was taken into custody for attempting to exit a conversation without saying ‘Right, I’ll let you crack on then.’ Bail is set at £200,000.`,
      `BREAKING NEWS!\n${chosenOne} was apprehended today after an elaborate heist plan was foiled by a small, yet strategically placed, ‘Caution: Wet Floor’ sign.`,
      `BREAKING NEWS!\n${chosenOne} was intercepted at Tesco self-checkout after attempting to scan a bottle of gin as ‘carrots’. Eyewitnesses report a heroic cashier saying, ‘Not today, mate.’`,
      `BREAKING NEWS!\n${chosenOne} was arrested at an M&S food hall after whispering ‘I could just live here’ one too many times while browsing the Percy Pigs.`,
      `BREAKING NEWS!\n${chosenOne} was taken into custody after attempting to merge into a queue without first asking ‘Is this the queue?’ despite it being painfully obvious.`,
      `BREAKING NEWS!\n${chosenOne} was caught red-handed attempting to leave a pub without doing the traditional ‘right, let’s make a move’ followed by another 20 minutes of standing near the door.`,
      `BREAKING NEWS!\n${chosenOne} has been detained after repeatedly saying ‘goodbye’ on a video call, only to continue talking for another five minutes. Authorities say they ‘had enough of this nonsense’.`,
    ];

    let newsMessage = messages[Math.floor(Math.random() * messages.length)];

    // Clear existing content and add the close button
    newsContainer.innerHTML = "";
    newsContainer.appendChild(closeButton);

    let newsText = document.createElement("p"); // Create a paragraph for the message
    newsText.style.marginTop = "20px"; // Add space below the close button
    newsContainer.appendChild(newsText);

    newsContainer.classList.remove("hidden");
    newsContainer.style.position = "absolute";
    newsContainer.style.top = "50%";
    newsContainer.style.left = "50%";
    newsContainer.style.transform = "translate(-50%, -50%)";
    newsContainer.style.zIndex = "1000";

    audio.play(); // Start playing the audio

    let index = 0;
    let typingSpeed = 7000 / newsMessage.length;

    function typeWriter() {
      if (index < newsMessage.length) {
        newsText.textContent += newsMessage.charAt(index);
        index++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    }
    typeWriter();
  }

  // Make startNews available globally
  window.startNews = startNews;
});
