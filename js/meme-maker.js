
/* Header JS */
function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}


/* Meme Creator */ 

let topTextInput, bottomTextInput, topTextSizeInput, bottomTextSizeInput, imageInput, generateBtn, canvas, ctx;

function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize) {
  let fontSize;

  img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  ctx.fillStyle = "white";
  ctx.strokeStyle = "#000";
  ctx.textAlign = "center";

  // Top text font size
  fontSize = canvas.width * topTextSize;
  ctx.font = fontSize + 'px Impact';
  ctx.lineWidth = canvas.width * 0.004;

  // Draw top text
  ctx.textBaseline = 'top';
  topText.split('\n').forEach(function (t, i) {
      ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
      ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
  });

  // Bottom text font size
  fontSize = canvas.width * bottomTextSize;
  ctx.font = fontSize + 'px Impact';
  ctx.lineWidth = canvas.width*0.004;

  // Draw bottom text
  ctx.textBaseline = 'bottom';
  bottomText.split('\n').reverse().forEach(function (t, i) {
      ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
      ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
   });

  // Show the download button
  downloadBtn.style.display = 'flex';

  // Remove existing event listener before adding a new one
  downloadBtn.removeEventListener('click', downloadMeme);
  downloadBtn.addEventListener('click', downloadMeme);
};
}

  // download function
function downloadMeme() {
  // Trigger the download
  const dataURL = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'meme.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

function init() {
    // Get references to elements
    topTextInput = document.getElementById('top-text');
    canvas = document.getElementById('meme-canvas');
    generateBtn = document.getElementById('generate-btn');
    downloadBtn = document.getElementById('download-btn');
    bottomTextInput = document.getElementById('bottom-text');
    topTextSizeInput = document.getElementById('top-text-size-input');
    bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    imageInput = document.getElementById('image-input');
  
    // Get 2D context from canvas
    ctx = canvas.getContext('2d');
  
    fontSize = null; // Optional: Allow setting a custom font size


    // Add event listener to generate button
    generateBtn.addEventListener('click', function () {
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();
        img.src = reader.result;
        generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
      };
      reader.readAsDataURL(imageInput.files[0]);
    });

    const templateImages = document.querySelectorAll('.meme-template-box img');
    templateImages.forEach(img => {
        img.addEventListener('click', function() {
            // Perform the same actions as the generate button click
            const selectedTemplate = this; // Use the clicked image as the selected template
            const imgSrc = selectedTemplate.src;
            const img = new Image();
            img.src = imgSrc;
            generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);

      // Remove selected class from all templates
      templateImages.forEach(templateImg => templateImg.classList.remove('selected'));

      // Add selected class to clicked image
      this.classList.add('selected');
      generateBtn.addEventListener('click', function () {
        const selectedTemplate = document.querySelector('.meme-template-box img.selected');
        if (selectedTemplate) {
          const imgSrc = selectedTemplate.src;
          const img = new Image();
          img.src = imgSrc;
          generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
        } else {
          alert('Please select a template image first!');
        }
      });
    });
  });
}

// Initialize the script after the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  init();
})

/* Accordian Item */
const accordionTitles = document.querySelectorAll('.accordion-title');    
accordionTitles.forEach(title => {
  title.addEventListener('click', function() {
    const accordionItem = this.parentElement;
    
    // Close other open accordions
    document.querySelectorAll('.accordion-item.active').forEach(item => {
      if (item !== accordionItem) {
        item.classList.remove('active');
      }
    });
    
    accordionItem.classList.toggle('active');
  });
})
