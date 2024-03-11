const channelId = 'UC3n5uGu18FoCy23ggWWp8tA';
const apiKey = getCookie("apiKey");


function updateSubscriberCountMumei() {

    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let subscriberCount = parseInt(data.items[0].statistics.subscriberCount);
            if (subscriberCount >= 1000000) {
                subscriberCount = (subscriberCount / 1000000).toFixed(2) + ' M';
            }
            let viewCount = parseInt(data.items[0].statistics.viewCount).toLocaleString();

            document.getElementById('subscriberCount').textContent = `${subscriberCount}`;
            document.getElementById('viewCount').textContent = `${viewCount}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// Initial call to update subscriber count
updateSubscriberCountMumei();
// Set interval to update subscriber count every 60 seconds (adjust interval as needed)
setInterval(updateSubscriberCountMumei, 300000); // 300000 milliseconds = 300 seconds = 5 minutes

function lastestLivestream() {

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=completed&type=video&order=date&maxResults=1&key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const livestream = data.items[0];
            const videoId = livestream.id.videoId;
            const title = livestream.snippet.title;
            const publishedAt = livestream.snippet.publishedAt;
            //const thumbnailUrlHigh = data.items[0].snippet.thumbnails.high.url;
            const thumbnailUrlHigh = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            const dateTime = new Date(publishedAt);
            const localDateTime = dateTime.toLocaleString();

            document.getElementById('livestreamDisplay').innerHTML = `
                <p class="top-left-text">${title}</p>
                <img src="${thumbnailUrlHigh}" class="card-image" alt="Image">
                <p class="bottom-left-text">${localDateTime}</p>
                <a href="${videoUrl}" class="button" target="_blank">Watch</a>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

lastestLivestream();
