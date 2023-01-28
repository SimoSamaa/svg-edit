import {
    myBody,
    workSpace,
} from '../js/var.js';

import { svgName, dropSvgName, svg } from '../js/main-script.js';

import { initColorPicker } from '../js/color-picker.js';

let optionesColor = document.createElement("div");
export let optionesDownload = document.createElement("div");

optionesColor.className = "optiones-color__main";
optionesDownload.className = "optiones-download__main";

optionesColor.innerHTML = `
    <div class ='recolor-option'>
        <p>recolor option</p>
        <div class='recolor-option__btn'>
            <button class='fill-option' data-tab='.tab-fill-option'>
                <img src='icons/color-p.svg'>
            </button>
            <button class='color-opacity' data-tab='.tab-color-opacity'>
                <img src='icons/color-p.svg'>
            </button>
        </div>
    </div>

    <div class='tab tab-fill-option act-tab'>
        <div class='item-colors'>
            <p class="title-tab">ITEM COLORS</p>
            <ul class="num-of__path"></ul>
        </div>
    </div>
    <div class='tab tab-color-opacity'>
        <p class="title-tab">BORDER COLOR</p>
        <div class="">
            <div class="control-stroke">
                <div class="current-color__svg"></div>
                <div class="stroke-ranges">
                    <div class="range-content">
                        <input type="range" value="5" min="0.5" max="10" step="0.5">
                        <span class="line-progress__range"></span>
                    </div>
                    <div class="range-content">
                        <input type="range" value="0.5" min="0.0" max="1" step="0.1">
                        <span class="line-progress__range"></span>
                    </div>
                </div>
            </div>
            <div class='color-picker'>
                <canvas id="colorCanvas"></canvas>
            </div>
        </div>
    </div>
`;

function optionesColors() {
    const recolorOptionBtns = document.querySelectorAll('.recolor-option__btn button'),
        tabs = document.querySelectorAll(".tab");

    recolorOptionBtns.forEach(recolorOptionBtn => {
        recolorOptionBtn.onclick = (e) => {
            tabs.forEach(tab => {
                tab.classList.remove('act-tab');
            });

            document.querySelector(e.currentTarget.dataset.tab).classList.add('act-tab');
        };
    });

    // tab three [stroke]
    let ranges = document.querySelectorAll("[type='range']");
    let progressRange = document.querySelectorAll(".line-progress__range");
    ranges.forEach((range, index) => {
        range.addEventListener("input", () => {
            progressRange.forEach((progress, index2) => {
                if (index == 0) {
                    if (index2 == 0) {
                        progress.style.width = range.value * 10 + "%"
                        svg.setAttribute("stroke-width", range.value + "px");
                    }
                } else if (index == 1) {
                    if (index2 == 1) {
                        progress.style.width = range.value * 100 + "%";
                        svg.setAttribute("stroke-opacity", range.value);
                    }
                }
            });
        });
    });

    initColorPicker();
};

optionesDownload.innerHTML = `
    <button class='upload-new-svg'>upload new SVG</button>
    <button class='dowload-main trans-in'>
        download 
        <img class='trans-in' src='icons/chevron.svg'></img>
    </button>
    <div class='drop-down-list trans-in-out'>
        <li class='png'>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;   transform: ;msFilter:;"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                PNG
            </button>
            <div class='drop-left__custom trans-in-out '>
                <ul class='btn-custom__down' style='text-align: center;'>
                    <li><button>512 x 512</button></li>
                    <li><button>256 x 256</button></li>
                    <li><button>128 x 128</button></li>
                <ul>
                <div class='custom-size'>
                    <p>custom size</p>
                    <div class='input-custom'>
                        <input type='number' value='288'>
                        X
                        <input type='number' value='288'>
                    </div>
                    <button class='btn-download__custom trans-in'>
                        download
                    </button>
                </div>
            </div>
        </li>
        <li class='svg'><button>SVG</button></li>
        <li class='pdf'><button>PDF</button></li>
    </div>
`;

export function addElementOptions() {
    workSpace.append(optionesColor, optionesDownload);

    let svgBtn = document.querySelector(".svg button");

    svgBtn.onclick = (link, base64doc) => {
        base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
        link = document.createElement('a');
        link.download = svgName || dropSvgName;
        link.href = 'data:image/svg+xml;base64,' + base64doc;
        link.click();
    };

    dropDownMenu();
    optionesColors();
};


function dropDownMenu() {
    let buttonHover = optionesDownload.children[1],
        buttonHover_img = optionesDownload.children[1].children[0];

    let dropDownList = document.querySelector(".drop-down-list");
    let dropDownLCustom = document.querySelector(".drop-left__custom");
    let png = document.querySelector(".png");

    png.onclick = () => {
        dropDownLCustom.classList.toggle("active")
    }

    let open = () => {
        buttonHover.classList.add("btn-down-hover");
        dropDownList.classList.add("act-drop-down-list");
        buttonHover_img.classList.add("act-rotate");
    };

    let close = () => {
        buttonHover.classList.remove("btn-down-hover");
        dropDownList.classList.remove("act-drop-down-list");
        buttonHover_img.classList.remove("act-rotate");
        dropDownLCustom.classList.remove("active")
    };

    buttonHover.addEventListener("click", () => {
        if (!buttonHover.classList.contains("btn-down-hover")) {
            open()
        } else close();
    });

    myBody.addEventListener("click", (e) => {
        let a = buttonHover.contains(e.target);
        let b = dropDownList.contains(e.target);

        if (!a && !b) {
            close()
        }
    });

    buttonHover.addEventListener("mouseover", (e) => {
        dropDownList.classList.add("act-drop-down-list");

        dropDownList.onmouseover = () => {
            dropDownList.classList.add("act-drop-down-list");
            buttonHover.classList.add("btn-down-hover");
            buttonHover_img.classList.add("act-rotate");
        };

        buttonHover.addEventListener("mouseout", () => {
            dropDownList.classList.remove("act-drop-down-list");

            dropDownList.onmouseout = () => {
                dropDownList.classList.remove("act-drop-down-list");
                buttonHover.classList.remove("btn-down-hover");
                buttonHover_img.classList.remove("act-rotate");
            };
        });
    });
};