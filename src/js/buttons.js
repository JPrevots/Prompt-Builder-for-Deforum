// Buttons
import { promptBuilder } from "./prompt.js"

let frameCounter = 0;

export function resetFrame(event, keyframeType) {
    addKeyframeAfter(event, keyframeType);
    addRemoveClass(event, keyframeType);
    removeKeyframe();
}

let frames = document.getElementsByClassName('promptKeyframe');
let framesContainter = document.getElementById('promptContainer');
export function addMultipleFrames() {
    let totalFrameNumber = Number(document.getElementById('totalFrameNumber').value);

    if (totalFrameNumber > frames.length) { // Prevents the never ending loop
        // Add as many frames as requested
        while (frames.length != totalFrameNumber) {
            addKeyframeEnd('prompt');
        }
    } else if (totalFrameNumber < frames.length) {
        // Removes frames if there are too many
        while (frames.length != totalFrameNumber) {
            framesContainter.lastChild.remove();
        }
    }
}

// Updates the totalFrameNumber field
function countingFrames() {
    let totalFrameNumber = document.getElementById('totalFrameNumber');
    totalFrameNumber.value = frames.length;
}

export function reorderFrameNumber() {
    //let frames = document.getElementsByClassName('promptKeyframe');
    let pattern = Number(document.getElementById('frameNumberPattern').value);

    // Change the frameNumber.value for each frame
    for (let i = 0; i < frames.length; i++ ) {
        let frameNumber = frames[i].children[1];
        for (let j = 0; j < 3; j++) { // Go down 3 levels to find the frameNumber div
            frameNumber = frameNumber.firstElementChild;
        }
        frameNumber.value = pattern * i;
    }
}

// keyframeType is either "prompt" or "motion"
export function newKeyframe(keyframeType) {
    let frameTemplate = document.getElementById(`${keyframeType}Template`);
    let newFrame = frameTemplate.cloneNode(true); // Makes an identical copy of the frame template

    newFrame.id = `${keyframeType}${frameCounter}`; // Changes the id
    frameCounter++; // Prepares the counter for the next time we create a frame
    newFrame.classList.remove(`${keyframeType}Template`);
    newFrame.classList.add(`${keyframeType}Keyframe`);
    newFrame.classList.remove("d-none"); // The template frame is hidden, we need to show the cloned one
    return newFrame
}

export function addKeyframeStart(keyframeType) {
    let container = document.getElementById(`${keyframeType}Container`);
    let newFrame = newKeyframe(keyframeType);
    if (newFrame.classList.contains(`${keyframeType}Keyframe`)) {
        container.insertAdjacentElement("afterbegin", newFrame);
    }
    countingFrames();
}

export function addKeyframeEnd(keyframeType) {
    let container = document.getElementById(`${keyframeType}Container`);
    let newFrame = newKeyframe(keyframeType);
    if (newFrame.classList.contains(`${keyframeType}Keyframe`)) {
        container.insertAdjacentElement("beforeend", newFrame);
    }
    countingFrames();
}

export function addKeyframeBefore(event, keyframeType) {
    let el = selectElement(event, keyframeType);
    let newFrame = newKeyframe(keyframeType);
    if (el != null) {
        el.insertAdjacentElement("beforebegin", newFrame);
    }
    countingFrames();
}

export function addKeyframeAfter(event, keyframeType) {
    let el = selectElement(event, keyframeType);
    let newFrame = newKeyframe(keyframeType);
    if (el != null) {
        el.insertAdjacentElement("afterend", newFrame);
    }
    countingFrames();
}

export function moveStart(event, keyframeType) {
    let container = document.getElementById(`${keyframeType}Container`);
    let el = selectElement(event, keyframeType);
    if (el.classList.contains(`${keyframeType}Keyframe`)) {
        container.insertAdjacentElement("afterbegin", el);
    }
}

export function moveEnd(event, keyframeType) {
    let container = document.getElementById(`${keyframeType}Container`);
    let el = selectElement(event, keyframeType);
    if (el.classList.contains(`${keyframeType}Keyframe`)) {
        container.insertAdjacentElement("beforeend", el);
    }
}

export function moveBefore(event, keyframeType) {
    let el = selectElement(event, keyframeType);
    let elementBefore = el.previousElementSibling;
    if (elementBefore != null) {
        elementBefore.insertAdjacentElement("beforebegin", el);
    }
}

export function moveAfter(event, keyframeType) {
    let el = selectElement(event, keyframeType);
    let elementAfter = el.nextElementSibling;
    if (elementAfter != null) {
        elementAfter.insertAdjacentElement("afterend", el);
    }
}

export function duplicateStart(event, keyframeType) {
    let container = document.getElementById(`${keyframeType}Container`);
    let el = selectElement(event, keyframeType);
    let newFrame = el.cloneNode(true);
    newFrame.id = `${keyframeType}${frameCounter}`;
    frameCounter++;
    container.insertAdjacentElement("afterbegin", newFrame);

    countingFrames();
}

export function duplicateEnd(event, keyframeType) {
    let container = document.getElementById(`${keyframeType}Container`);
    let el = selectElement(event, keyframeType);
    let newFrame = el.cloneNode(true);
    newFrame.id = `${keyframeType}${frameCounter}`;
    frameCounter++;
    //container.append(newFrame);
    container.insertAdjacentElement("beforeend", newFrame);

    countingFrames();
}

export function duplicateBefore(event, keyframeType) {
    let el = selectElement(event, keyframeType);
    let newFrame = el.cloneNode(true);
    newFrame.id = `${keyframeType}${frameCounter}`;
    frameCounter++;
    el.insertAdjacentElement('beforebegin', newFrame); // Append before

    countingFrames();
}

export function deleteKeyframe(event, keyframeType) {
    addRemoveClass(event, keyframeType);
    removeKeyframe(keyframeType);
    countingFrames();
}

// Moves up in the DOM from the button until an element having the class "name" is found, which would be the div containing the whole frame
export function selectElement(event, name) {
    let el = event.target;
    while (!el.classList.contains(`${name}Keyframe`)) {
        el = el.parentElement;
    }
    return el;
}

// Checks if the element that triggered the click has a class of 'keyframe'; if it doesn't, checks the parent and so on; When it does : add class of 'remove'
export function addRemoveClass(event, keyframeType) {
    let el = selectElement(event, keyframeType);
    el.classList.add('remove');
}

// Removes every elements with the class 'remove'
function removeKeyframe() {
    let els = document.getElementsByClassName('remove');
    for (let i = 0; i < els.length; i++) {
        els[i].remove();
    }
}

export function copyPromptToClipboard() {
    navigator.clipboard.writeText(promptBuilder());
}

export function savePromptToFile() {
    let content = promptBuilder();
    let promptName = document.getElementById('promptName').value;

    // Sanity Check
    promptName = promptName.trim();
    if (promptName == (null || '')) {
        promptName = "prompt";
    }

    let output = "data:text/json;charset=utf-8," + encodeURIComponent(content);
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", output);
    downloadAnchorNode.setAttribute("download", promptName + ".txt");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

class fileSave {
    constructor() {
        this.promptName = document.getElementById('promptName').value;
        this.frameNumberPattern = document.getElementById('frameNumberPattern').value;
        this.totalFrameNumber = document.getElementById('totalFrameNumber').value;
        this.globalPositivePrompt = document.getElementById('globalPositivePrompt').value;
        this.globalNegativePrompt = document.getElementById('globalNegativePrompt').value;
        this.prompts;
    }
}

class promptFrames {
    constructor(frameNumber, specificNegativePrompt, specificPositivePrompt) {
        this.frameNumber = frameNumber;
        this.specificNegativePrompt = specificNegativePrompt;
        this.specificPositivePrompt = specificPositivePrompt;
    }
}

export function saveConfig() {
    let positivePromptCache = document.getElementsByClassName('positivePrompt');
    let negativePromptCache = document.getElementsByClassName('negativePrompt');
    let frameNumberCache = document.getElementsByClassName('frameNumber');
    let prompts = [];

    let content = new fileSave();

    for (let i = 0; i < positivePromptCache.length - 1; i++) {
        let frameNumber = frameNumberCache[i].value;
        let specificNegativePrompt = negativePromptCache[i].value;
        let specificPositivePrompt = positivePromptCache[i].value;

        let prompt = new promptFrames(frameNumber, specificNegativePrompt, specificPositivePrompt);
        //let prompt = [frameNumber, specificNegativePrompt, specificPositivePrompt];
        prompts.push(prompt);
    }

    content.prompts = prompts;

    // Sanity Check
    let fileName = (content.promptName).trim();
    if (fileName == (null || '')) {
        fileName = "prompt";
    }

    content = JSON.stringify(content);

    let output = "data:text/json;charset=utf-8," + encodeURIComponent(content);
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", output);
    downloadAnchorNode.setAttribute("download", fileName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Number on the top left of each frame
export function eventNumber() {
    for (let y = 0; y < frames.length; y++ ) {
        let eventNumber = frames[y].children[0];
        for (let j = 0; j < 2; j++) { // Go down 3 levels to find the eventNumber div
            eventNumber = eventNumber.firstElementChild;
        }
        eventNumber.textContent = y + 1;
    }
}