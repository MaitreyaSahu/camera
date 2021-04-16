console.log('connected');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');



function playVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(mediaStream => {
        console.log(mediaStream);
        video.srcObject = mediaStream;
        video.play();
        paintToCanvas();
    }).catch(err => alert('Please allow camera access...'));
    
}

function paintToCanvas(){
    const height = video.height;
    const width = video.width;

    canvas.height = height;
    canvas.width = width;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

    }, 20);
}

playVideo();