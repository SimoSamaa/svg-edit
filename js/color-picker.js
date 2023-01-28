import { svg } from "../js/main-script.js";

export function initColorPicker() {
    var canvas = document.getElementById('colorCanvas');
    var canvasContext = canvas.getContext('2d');

    let gradient = canvas.getContext('2d').createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(1 / 6, '#ffff00');
    gradient.addColorStop((1 / 6) * 2, '#00ff00');
    gradient.addColorStop((1 / 6) * 3, '#00ffff');
    gradient.addColorStop((1 / 6) * 4, '#0000ff');
    gradient.addColorStop((1 / 6) * 5, '#ff00ff');;
    gradient.addColorStop(1, '#ff0000');
    canvas.getContext('2d').fillStyle = gradient;
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);

    gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    canvas.getContext('2d').fillStyle = gradient;
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);

    gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    canvas.getContext('2d').fillStyle = gradient;
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);


    canvas.onclick = function (e) {
        var imgData = canvasContext.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1);
        var rgba = imgData.data;
        var color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
        console.log("%c" + color, "color:" + color);
        svg.setAttribute("stroke", color, "color:" + color);

        if (document.querySelector(".current-color__svg") != "") {
            document.querySelector(".current-color__svg").innerHTML = "";
        }

        document.querySelector(".current-color__svg").style.backgroundColor = color, "color:" + color;
    };

    const sec = document.querySelector(".color-picker");

    function piker(event, element) {
        let posX = event.offsetX;
        let posY = event.offsetY;

        console.log(posX, posY);

        element.style.setProperty("--x", posX + "px");
        element.style.setProperty("--y", posY + "px");
    };

    sec.addEventListener("click", (e) => {
        piker(e, sec);
    });
};

export function canvasColorPicker() {
    const colorPickerList = document.querySelectorAll(".color-picker-list canvas");

    colorPickerList.forEach(colorPicker => {
        // console.log(colorPicker);
        var canvasContext = colorPicker.getContext('2d');

        let gradient = colorPicker.getContext('2d').createLinearGradient(0, 0, colorPicker.width, 0);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(1 / 6, '#ffff00');
        gradient.addColorStop((1 / 6) * 2, '#00ff00');
        gradient.addColorStop((1 / 6) * 3, '#00ffff');
        gradient.addColorStop((1 / 6) * 4, '#0000ff');
        gradient.addColorStop((1 / 6) * 5, '#ff00ff');
        gradient.addColorStop(1, '#ff0000');
        colorPicker.getContext('2d').fillStyle = gradient;
        colorPicker.getContext('2d').fillRect(0, 0, colorPicker.width, colorPicker.height);

        gradient = colorPicker.getContext('2d').createLinearGradient(0, 0, 0, colorPicker.height);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        colorPicker.getContext('2d').fillStyle = gradient;
        colorPicker.getContext('2d').fillRect(0, 0, colorPicker.width, colorPicker.height);

        gradient = colorPicker.getContext('2d').createLinearGradient(0, 0, 0, colorPicker.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
        colorPicker.getContext('2d').fillStyle = gradient;
        colorPicker.getContext('2d').fillRect(0, 0, colorPicker.width, colorPicker.height);

        colorPicker.onclick = function (e) {
            var imgData = canvasContext.getImageData((e.offsetX / colorPicker.clientWidth) * colorPicker.width, (e.offsetY / colorPicker.clientHeight) * colorPicker.height, 1, 1)
            var rgba = imgData.data;
            var color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
            console.log("%c" + color, "color:" + color);
            // svg.setAttribute("stroke", color, "color:" + color);

            // if (document.querySelector(".current-color__svg") != "") {
            //     document.querySelector(".current-color__svg").innerHTML = "";
            // }

            // document.querySelector(".current-color__svg").style.backgroundColor = color, "color:" + color;
        };
    });
};