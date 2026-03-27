document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news");
  const nameInput = document.getElementById("nameInput");
  const closeButton = document.createElement("button"); // Create close button dynamically
  closeButton.textContent = "x";
  closeButton.classList.add("close-btn");
  const audio = document.getElementById("radioSound"); // Get audio element
  const breakingNewsLabel = "BREAKING NEWS!";
  const messageTemplatesPromise = fetch("./messages.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load message templates.");
      }
      return response.json();
    })
    .then((templates) => {
      if (!Array.isArray(templates) || templates.length === 0) {
        throw new Error("Message templates are empty.");
      }
      return templates;
    });

  closeButton.addEventListener("click", function () {
    newsContainer.classList.add("hidden"); // Hide message box when clicked
    audio.pause(); // Stop the audio
    audio.currentTime = 0; // Reset audio to the beginning
  });

  function capitalizeFirstLetter(name) {
    if (!name) {
      return "";
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  async function startNews() {
    let names = nameInput.value.split("\n")
      .map((n) => n.trim())
      .map(capitalizeFirstLetter)
      .filter((n) => n);

    nameInput.value = names.join("\n");

    if (names.length === 0) {
      alert("Enter at least one name!");
      return;
    }
    let chosenOne = names[Math.floor(Math.random() * names.length)];
    let messageTemplates;

    try {
      messageTemplates = await messageTemplatesPromise;
    } catch (error) {
      alert("The message list could not be loaded.");
      return;
    }

    let selectedTemplate =
      messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    const storyMessage = ` ${selectedTemplate}`;
    const newsMessage = `${breakingNewsLabel}\n${chosenOne}${storyMessage}`;

    // Clear existing content and add the close button
    newsContainer.innerHTML = "";
    newsContainer.appendChild(closeButton);

    let newsText = document.createElement("div");
    newsText.classList.add("news-copy");

    const headlineText = document.createElement("div");
    headlineText.classList.add("news-headline");

    const storyLine = document.createElement("div");
    storyLine.classList.add("news-storyline");

    const nameText = document.createElement("span");
    nameText.classList.add("news-name");

    const storyText = document.createElement("span");
    storyText.classList.add("news-story");

    storyLine.appendChild(nameText);
    storyLine.appendChild(storyText);
    newsText.appendChild(headlineText);
    newsText.appendChild(storyLine);
    newsContainer.appendChild(newsText);

    newsContainer.classList.remove("hidden");

    audio.play(); // Start playing the audio

    let index = 0;
    let typingSpeed = 7000 / newsMessage.length;

    function renderTypedContent(characterCount) {
      const headlineCount = Math.min(characterCount, breakingNewsLabel.length);
      const remainingAfterHeadline = Math.max(
        characterCount - breakingNewsLabel.length - 1,
        0
      );
      const nameCount = Math.min(remainingAfterHeadline, chosenOne.length);
      const storyCount = Math.max(remainingAfterHeadline - chosenOne.length, 0);

      headlineText.textContent = breakingNewsLabel.slice(0, headlineCount);
      nameText.textContent = chosenOne.slice(0, nameCount);
      storyText.textContent = storyMessage.slice(0, storyCount);
    }

    function typeWriter() {
      if (index < newsMessage.length) {
        renderTypedContent(index + 1);
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
