// Buttons

import { promptBuilder } from "./prompt.js"

let frameCounter = 0;

export function resetFrame(event, keyframeType) {
    addKeyframeAfter(event, keyframeType);
    addRemoveClass(event, keyframeType);
    removeKeyframe();
}

// keyframeType is either "prompt" or "motion"
export function newnewKeyframe(keyframeType) {
    let frameTemplate = document.getElementById(`${keyframeType}Template`);
    let newFrame = frameTemplate.cloneNode(true); // Makes an identical copy of the frame template

    newFrame.id = `${keyframeType}${frameCounter}`; // Changes the id

    //newFrame.classList.add(keyframeType);
    frameCounter++; // Prepares the counter for the next time we create a frame
    newFrame.classList.remove(`${keyframeType}Template`);
    newFrame.classList.add(`${keyframeType}Keyframe`);
    newFrame.classList.remove("d-none"); // The template frame is hidden, we need to show the cloned one
    return newFrame
}

export function addKeyframeStart(keyframeType) {
    let container = document.getElementById(`${keyframeType}Container`);
    let newFrame = newnewKeyframe(keyframeType);
    if (newFrame.classList.contains(`${keyframeType}Keyframe`)) {
        container.insertAdjacentElement("afterbegin", newFrame);
    }
}

export function addKeyframeEnd(keyframeType) {
    let container = document.getElementById(`${keyframeType}Container`);
    let newFrame = newnewKeyframe(keyframeType);
    if (newFrame.classList.contains(`${keyframeType}Keyframe`)) {
        container.insertAdjacentElement("beforeend", newFrame);
    }
}

export function addKeyframeBefore(event, keyframeType) {
    let el = selectElement(event, keyframeType);
    let newFrame = newnewKeyframe(keyframeType);
    if (el != null) {
        el.insertAdjacentElement("beforebegin", newFrame);
    }
}

export function addKeyframeAfter(event, keyframeType) {
    let el = selectElement(event, keyframeType);
    let newFrame = newnewKeyframe(keyframeType);
    if (el != null) {
        el.insertAdjacentElement("afterend", newFrame);
    }
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
    container.insertAdjacentElement("afterbegin", el);
}

export function duplicateKeyframe(event, type, keyframeType) {
    let el = selectElement(event, keyframeType);
    let newFrame = el.cloneNode(true);
    newFrame.id = `${keyframeType}${frameCounter}`;
    frameCounter++;
    let container = document.getElementById(`${keyframeType}Container`);
    if (type == 0) {
        // Append at the start
        container.prepend(newFrame);
    } else if (type == 1) {
        // Append before
        el.insertAdjacentElement('beforebegin', newFrame);
    } else if (type == 2) {
        // Append to the end
        container.append(newFrame);
    }
}

export function deleteKeyframe(event, keyframeType) {
    addRemoveClass(event, keyframeType);
    removeKeyframe(keyframeType);
}

// Moves up in the DOM from the button until an element having the class passed as "name" is found, which would be the div containing the whole frame
export function selectElement(event, name) {
    console.log(name);
    console.log(event);
    let el = event.target;
    while (!el.classList.contains(`${name}Keyframe`)) {
        el = el.parentElement;
    }
    console.log(el);
    return el;
}

// TODO // Not Working
/* export function reorderFrames() {
    let keyframes = document.getElementsByClassName(keyframeType);
    for (let i = 0; i < promptContainer.length; i++) {
        keyframes[i];
    }
} */

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

export function buttonInvertState(elementId) {
    let el = document.getElementById(elementId);
}

export function copyPromptToClipboard() {
    navigator.clipboard.writeText(promptBuilder());
}

export function eventNumber() {

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