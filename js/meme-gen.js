const memeBlocks = document.querySelectorAll(".individual-meme-block");
const loadMoreBtn = document.querySelector(".load-more-btn-frame #load-more-btn");


const updateDetails = (memeBlock, url, title, author) => {
    const memeImage = memeBlock.querySelector("img");
    const memeTitle = memeBlock.querySelector(".meme-title");

    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
};

const loadedMemeUrls = new Set();

const generateMeme = (memeBlock) => {
console.log (memeBlock);
    return fetch("https://meme-api.com/gimme/wholesomememes")
        .then((response) => response.json())
        .then((data) => {
            // Check if the meme URL has already been loaded
            if (!loadedMemeUrls.has(data.url)) {
                updateDetails(memeBlock, data.url, data.title, data.author);
                loadedMemeUrls.add(data.url);
            } else {
                // If the meme URL is not unique, fetch again
                return generateMeme(memeBlock);
            }
        });
};

const loadMoreMemes = () => {
    for (let i = 0; i < 10; i++) {
        const newMemeBlock = document.createElement("div");
        newMemeBlock.className = "individual-meme-block";
        let memeGenerator = document.createElement("div");
        memeGenerator.className = "meme-generator";
        newMemeBlock.appendChild(memeGenerator);
        let memeTitle = document.createElement("h2");
        memeTitle.className = "meme-title";
        memeTitle.innerText = "Loading...";
        let memeImage = document.createElement("img");
        memeImage.src = "";
        memeImage.alt = "";
        memeGenerator.appendChild(memeTitle);
        memeGenerator.appendChild(memeImage);
        document.querySelector(".main-meme-block").appendChild(newMemeBlock);

        generateMeme(newMemeBlock);
    }
};

loadMoreBtn.addEventListener("click", loadMoreMemes);

// Initial load of memes
memeBlocks.forEach((block) => {
    generateMeme(block);
});
