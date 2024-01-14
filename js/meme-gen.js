const memeBlocks = document.querySelectorAll(".individual-meme-block");

const updateDetails = (memeBlock, url, title, author) => {
    const memeImage = memeBlock.querySelector("img");
    const memeTitle = memeBlock.querySelector(".meme-title");
    const memeAuthor = memeBlock.querySelector(".meme-author");

    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = `Meme by: ${author}`;
};

const generateMeme = (memeBlock) => {
    fetch("https://meme-api.com/gimme/wholesomememes")
        .then((response) => response.json())
        .then((data) => {
            updateDetails(memeBlock, data.url, data.title, data.author);
        });
};

memeBlocks.forEach((block) => {
    generateMeme(block);
});
