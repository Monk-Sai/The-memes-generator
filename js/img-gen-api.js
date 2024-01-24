const imageCanvas = document.getElementById('image-canvas');
const imageInput = document.getElementById('image-input');
const downloadButton = document.getElementById('download-button');

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/AvalingHawx/image_creater",
        {
            headers: { Authorization: 'Bearer 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' },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return URL.createObjectURL(result);
}

async function fetchAndDisplayImage() {
    const prompt = document.getElementById('prompt').value;

    if (!prompt) {
        alert('Please enter a prompt.');
        return;
    }

    try {
        const imageUrl = await query({ "inputs": prompt });
        displayImage(imageUrl);
    } catch (error) {
        console.error('Error fetching image:', error);
        alert('Error fetching image. Please try again.');
    }
}

function displayImage(imageUrl) {
    const container = document.getElementById('container');
    container.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
}