const generateForm = document.querySelector(".generator-form");
const imgGallery = document.querySelector(".img-gallery");

const OPENAI_API_KEY = "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";

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imgGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");

        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
        }
    });
}

const generateAiImages = async (userPrompt, userImgQuantity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: userImgQuantity,
                size: "512x512",
                response_format: "b64_json"
            })
        });

       if(!response.ok) throw new Error("Failed to generate images! Please try again."); 

        const { data } = await response.json();
        updateImageCard([...data])
        console.log(data)
    } catch (error) { 
        alter(error.message);
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();

    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
        `<div class="img-card loading">
            <img src="imgs/loader.svg" alt="image">
            <a href="#" class="download-btn">
                <img src="imgs/download.svg" alt="download icon">
            </a>
        </div>`
    ).join("");

    console.log(imgCardMarkup);

    imgGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImgQuantity);
   
}

generateForm.addEventListener("submit", handleFormSubmission); 