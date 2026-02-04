const display = document.getElementById("timeDisplay");
const toggleBtn = document.getElementById("toggleBtn");
const lapBtn = document.getElementById("lapBtn");
const clearBtn = document.getElementById("clearBtn");
const lapBox = document.getElementById("lapContainer");

let secondsPassed = 0;
let intervalRef = null;
let lapIndex = 1;

function convertTime(totalSeconds) {
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    return (
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0")
    );
}

toggleBtn.addEventListener("click", () => {
    if (intervalRef === null) {
        intervalRef = setInterval(() => {
            secondsPassed++;
            display.textContent = convertTime(secondsPassed);
        }, 1000);
        toggleBtn.textContent = "Stop";
    } else {
        clearInterval(intervalRef);
        intervalRef = null;
        toggleBtn.textContent = "Start";
    }
});

lapBtn.addEventListener("click", () => {
    if (secondsPassed > 0) {
        const lapText = document.createElement("p");
        lapText.textContent = `Lap ${lapIndex} → ${convertTime(secondsPassed)}`;
        lapBox.appendChild(lapText);
        lapBox.style.display = "block";
        lapIndex++;
    }
});

clearBtn.addEventListener("click", () => {
    clearInterval(intervalRef);
    intervalRef = null;
    secondsPassed = 0;
    lapIndex = 1;

    display.textContent = "00:00:00";
    toggleBtn.textContent = "Start";
    lapBox.innerHTML = "";
    lapBox.style.display = "none";
});

