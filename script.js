const kerze = document.getElementById("kerze");
const button = document.getElementById("start");
button.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        function checkSound() {
            analyser.getByteFrequencyData(dataArray);
            let volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            if (volume > 10) {  // Schwelle für "ausblasen"
                kerze.src = "kerze_aus.png";
            } else {
                kerze.src = "kerze_an.png";
            }
            requestAnimationFrame(checkSound);
        }
        checkSound();
    } catch (error) {
        alert("Mikrofonzugriff verweigert oder nicht verfügbar.");

    }
});
