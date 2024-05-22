// Function to add custom button to each tweet
function addCustomButton() {
  const tweets = document.querySelectorAll('article[data-testid="tweet"]');
  
  tweets.forEach(tweet => {
    if (tweet.querySelector('.custom-button')) return; // Avoid adding multiple buttons

    const button = document.createElement('button');
    button.className = 'custom-button';
    
    // Create an image element for the icon
    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('icon1.png'); // Ensure this path is correct
    icon.className = 'custom-button-icon';

    // Add icon to the button
    button.appendChild(icon);
	
	button.addEventListener('mouseover', () => {
      icon.src = chrome.runtime.getURL('icon1_mo.png'); // Hover icon
    });
    button.addEventListener('mouseout', () => {
      icon.src = chrome.runtime.getURL('icon1.png'); // Default icon
    });

    button.addEventListener('click', () => {
      const tweetLink = tweet.querySelector('a[href*="/status/"]');
      const tweetId = tweetLink.getAttribute('href').split('/status/')[1].split('?')[0];
      const tweetUrl = `https://x.com${tweetLink.getAttribute('href')}`;
      const tweetText = tweet.querySelector('div[lang]').innerText;

      // Log tweetId, tweetUrl, and tweetText to the console for verification
      console.log('Tweet ID:', tweetId);
      console.log('Tweet URL:', tweetUrl);
      console.log('Tweet Text:', tweetText);
	  
      // POST request to the API
      fetch('example/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tweetId, tweetText, tweetUrl})
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
    });

    // Append the button to the tweet's action bar
    const actionBar = tweet.querySelector('div[role="group"]');
    if (actionBar) {
      actionBar.appendChild(button);
    }
  });
}

// Observer to detect when new tweets are loaded
const observer = new MutationObserver(addCustomButton);
observer.observe(document, { childList: true, subtree: true });

// Initial run
addCustomButton();
