
import {
    buttonMode,
    moon,
    sun,
    myBody,
    workSpace,
    uploadContainer,
    browseBtn,
} from '../js/var.js';

import {
    addElementOptions,
    optionesDownload
} from '../js/optiones.js';

import {
    canvasColorPicker
} from '../js/color-picker.js';

let saveDataMode = localStorage.getItem("data-mode");
if (saveDataMode && saveDataMode === "dark-mode") {
    myBody.classList.toggle("dark-mode");
    sun.classList = localStorage["act"];
    moon.classList = localStorage["dis"];
};

function buttonChangeMode() {
    myBody.classList.toggle("dark-mode")
    sun.classList.toggle("active-mode");
    if (myBody.classList.contains("dark-mode")) {
        localStorage.setItem("data-mode", 'dark-mode')
        window.localStorage.setItem("act", sun.className);
        moon.classList.add("active-mode")
    } else {
        localStorage.setItem("data-mode", 'light-mode')
        moon.classList.remove("active-mode")
    }

    window.localStorage.setItem("dis", moon.className);
};

buttonMode.addEventListener("click", buttonChangeMode);

let img = document.querySelectorAll("img");

img.forEach(elementImg => {
    elementImg.setAttribute("loading", "lazy");
    elementImg.setAttribute("decoding", "async");

    if (elementImg.src.includes("svg")) {
        elementImg.setAttribute("type", "image/svg/xml");
    }
});

let inputFileSvg = null;
export let svgName = null;
export let svg = null;
export let dropSvgName = null;

// create main image (img => svg)
export let mainImg = document.createElement("img");
mainImg.className = "main-img";

// create input file (.svg)
let inputFile = document.createElement("input");
inputFile.setAttribute("type", 'file');
inputFile.setAttribute("accept", 'image/svg+xml')
inputFile.style.display = "none";
workSpace.appendChild(inputFile);

function uploadSvgFileBrowse() {
    inputFileSvg = inputFile.files[0];
    console.log(inputFileSvg);
    svgName = inputFileSvg.name.split('.').slice(0, -1).pop();

    console.log(svgName);

    checkFileReader();
};

inputFile.addEventListener("change", uploadSvgFileBrowse);

browseBtn.addEventListener('click', () => {
    inputFile.click();
});

uploadContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("in box");
    uploadContainer.classList.add("drag-active");
    uploadContainer.style.opacity = ".7";
});

uploadContainer.addEventListener("dragleave", () => {
    uploadContainer.classList.remove("drag-active");
    uploadContainer.style.opacity = "1";
});

let errorFileType = document.createElement("div");
errorFileType.className = "error-file__type trans-in trans-in-out ";
errorFileType.append(document.createTextNode("Please upload SVG file only"))
workSpace.appendChild(errorFileType);

uploadContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    inputFileSvg = e.dataTransfer.files[0];
    dropSvgName = inputFileSvg.name.split('.').slice(0, -1).pop();

    console.log(dropSvgName);

    uploadContainer.style.opacity = "1";

    if (inputFileSvg.type === "image/svg+xml") {
        checkFileReader();
    } else if (inputFileSvg.type != "image/svg+xml") {
        uploadContainer.classList.remove("drag-active");
        errorFileType.classList.add("active-error");

        setTimeout(() => {
            errorFileType.classList.remove("active-error");
        }, 5000);
    };

});

myBody.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);

myBody.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);

function checkFileReader() {
    const reader = new FileReader();

    reader.onload = () => {
        mainImg.setAttribute("src", reader.result);
        changeTypeOfImgToSvg();
    }

    reader.readAsDataURL(inputFileSvg);
    uploadContainer.classList.add("drag-active");

    if (uploadContainer.innerHTML != "") {
        uploadContainer.innerHTML = "";
        uploadContainer.appendChild(mainImg);
        uploadContainer.style.padding = "0";

        workSpace.classList.add("add-optiones");
        document.querySelector(".container-upload__padding").classList.add("active-padding");

        optionesDownload.children[0].onclick = () => {
            inputFile.click();
            //  
        };

        // remove error notification in mode edit
        errorFileType.remove();

        //  disable drop box event
        uploadContainer.addEventListener("dragover", (e) => {
            uploadContainer.style.cssText
                = 'opacity: 1; border-style: solid; pointer-events: none;';
        }, false);

        addElementOptions();
    }
};

function changeTypeOfImgToSvg() {
    fetch(mainImg.src)
        .then(res => res.text())
        .then(data => {
            const parser = new DOMParser();
            svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

            if (mainImg.id) svg.id = mainImg.id;
            if (mainImg.className) svg.classList = mainImg.classList;

            mainImg.parentNode.replaceChild(svg, mainImg);

            document.querySelectorAll("svg").forEach(svg => {
                if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
                    svg.removeAttribute('width');
                    svg.removeAttribute('height');
                }
            });

            if (svg.hasAttribute("stroke")) {
                document.querySelector(".current-color__svg").innerHTML = '';
                document.querySelector(".current-color__svg").style.backgroundColor = svg.getAttribute("stroke");
            } else {
                document.querySelector(".current-color__svg").innerHTML = '<img src="/icons/none.svg">';
                document.querySelector(".current-color__svg").style.backgroundColor = "transparent"
            }

            // canvasColorPicker();
            loopFromListColor();
        });
};

function loopFromListColor() {
    // tab one [fill]
    let numOfTab = document.querySelector(".num-of__path");
    let svgPath = document.querySelectorAll("path[fill]");
    let svgCircle = document.querySelectorAll("circle[fill]");
    let svgRect = document.querySelectorAll("rect[fill]");

    for (let i = 0; i < svgPath.length; i++) {
        const listPath = document.createElement("li");
        const listPathButton = document.createElement("button");
        const colorPicker = document.createElement("div");
        listPath.className = "list-path";
        listPathButton.className = "list-path-button";
        colorPicker.className = "color-picker-list";
        colorPicker.innerHTML = `
            <canvas class="color-picker">
        `;
        listPathButton.style.backgroundColor = svgPath[i].getAttribute("fill");
        listPath.append(listPathButton, colorPicker);
        numOfTab.appendChild(listPath);
    }

    for (let i = 0; i < svgCircle.length; i++) {
        const listPath = document.createElement("li");
        const listPathButton = document.createElement("button");
        const colorPicker = document.createElement("div");
        listPath.className = "list-path";
        listPathButton.className = "list-path-button";
        colorPicker.className = "color-picker-list";
        colorPicker.innerHTML = `
        <canvas class="color-picker">
        `;
        listPathButton.style.backgroundColor = svgCircle[i].getAttribute("fill");
        listPath.append(listPathButton, colorPicker);
        numOfTab.appendChild(listPath);
    }

    for (let i = 0; i < svgRect.length; i++) {
        const listPath = document.createElement("li");
        const listPathButton = document.createElement("button");
        const colorPicker = document.createElement("div");
        listPath.className = "list-path";
        listPathButton.className = "list-path-button";
        colorPicker.className = "color-picker-list";
        colorPicker.innerHTML = `
        <canvas class="color-picker">
        `;
        listPathButton.style.backgroundColor = svgRect[i].getAttribute("fill");
        listPath.append(listPathButton, colorPicker);
        numOfTab.appendChild(listPath);
    }

    document.addEventListener("click", (e) => {
        const buttonLinkAct = e.target.matches(".list-path-button");
        console.log(buttonLinkAct);

        if (!buttonLinkAct && e.target.closest(".list-path") != null) return;

        let currentButtonLinkAct = null;

        if (buttonLinkAct) {
            currentButtonLinkAct = e.target.closest(".list-path");
            currentButtonLinkAct.classList.toggle("act-list-colors");
        }

        document.querySelectorAll(".list-path.act-list-colors").forEach(dropdownColor => {
            if (currentButtonLinkAct != dropdownColor) {
                dropdownColor.classList.remove("act-list-colors");
            }
        });

    });

    canvasColorPicker();
}