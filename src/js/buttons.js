// Buttons

import { promptBuilder } from "./prompt.js"

let frameCounter = 0;
let promptKeyframes = document.getElementById('promptKeyframes');

/* export function resetFrame(event) {
    let el = selectFrame(event,'keyframe');

    addKeyframeAfter(event);

    // GetElementsByClassName returns a collection of HTML elements
    // But in this case we know we only have index 0
    // There is only 1 element with the classname we're looking for
    el.getElementsByClassName('prompt')[0].value = '';
    el.getElementsByClassName('negativePrompt')[0].value = '';
    el.getElementsByClassName('frameNumber')[0].value = '';

    // A better alternative would be to create a new frame after 'el' and then remove it
    // But it works for now
} */

export function resetFrame(event) {
    addKeyframeAfter(event);
    addRemoveClass(event);
    removeKeyframe();
}

export function newKeyframe() {
    let frameTemplate = document.getElementById('keyframeTemplate');
    let newFrame = frameTemplate.cloneNode(true); // Makes an identical copy of the frame template
    // Changes the ID to avoid conflict if we need to duplicate that frame later, the number doesn't matter for anything else
    newFrame.id = `frame${frameCounter}`;
    newFrame.classList.add('keyframe');
    frameCounter++; // Prepares the counter for the next time we create a frame
    newFrame.classList.remove("d-none"); // The template frame is hidden, we need to show the cloned one
    return newFrame
}

export function addKeyframeStart() {
    let el = newKeyframe();
    if (el.classList.contains('keyframe')) {
        promptKeyframes.insertAdjacentElement("afterbegin", el);
    }
}

export function addKeyframeEnd() {
    let el = newKeyframe();
    if (el.classList.contains('keyframe')) {
        promptKeyframes.insertAdjacentElement("beforeend", el);
    }
}

export function addKeyframeBefore(event) {
    let el = selectFrame(event,'keyframe');
    let newFrame = newKeyframe();
    if (el != null) {
        el.insertAdjacentElement("beforebegin", newFrame);
    }
}

export function addKeyframeAfter(event) {
    let el = selectFrame(event,'keyframe');
    let newFrame = newKeyframe();
    if (el != null) {
        el.insertAdjacentElement("afterend", newFrame);
    }
}

export function moveStart(event) {
    let el = selectFrame(event, 'keyframe');
    if (el.classList.contains('keyframe')) {
        promptKeyframes.insertAdjacentElement("afterbegin", el);
    }
}

export function moveEnd(event) {
    let el = selectFrame(event, 'keyframe');
    if (el.classList.contains('keyframe')) {
        promptKeyframes.insertAdjacentElement("beforeend", el);
    }
}

export function moveBefore(event) {
    let el = selectFrame(event, 'keyframe');
    let elementBefore = el.previousElementSibling;
    if (elementBefore != null) {
        elementBefore.insertAdjacentElement("beforebegin", el);
    }
}

export function moveAfter(event) {
    let el = selectFrame(event, 'keyframe');
    let elementAfter = el.nextElementSibling;
    if (elementAfter != null) {
        elementAfter.insertAdjacentElement("afterend", el);
    }
}

export function duplicateKeyframe(event, type) {
    let el = selectFrame(event, 'keyframe')
    let newFrame = el.cloneNode(true);
    newFrame.id = `frame${frameCounter}`;
    frameCounter++;
    // Append at the start
    if (type == 0) {
        promptKeyframes.prepend(newFrame);
    } else if (type == 1) {
        // Append before
        el.insertAdjacentElement('beforebegin', newFrame);
    } else if (type == 2) {
        // Append to the end
        promptKeyframes.append(newFrame);
    }
}

export function deleteKeyframe(event) {
    addRemoveClass(event);
    removeKeyframe();
}

// Moves up in the DOM from the button until an element having the class passed as "name" is found, which would be the div containing the whole frame
export function selectFrame(event, name) {
    let el = event.target;
    while (!el.classList.contains(name)) {
        el = el.parentElement;
    }
    return el;
}

// TODO // Not Working
export function reorderFrames() {
    let keyframes = document.getElementsByClassName('keyframe');
    for (let i = 0; i < promptKeyframes.length; i++) {
        keyframes[i];
    }
}

// Checks if the element that triggered the click has a class of 'keyframe'; if it doesn't, checks the parent and so on; When it does : add class of 'remove'
export function addRemoveClass(event) {
    let el = selectFrame(event, 'keyframe');
    el.classList.add('remove');
}

// Checks every elements with the class 'keyframe' if they have the class 'remove', if so ...removes them
function removeKeyframe() {
    let keyframes = document.getElementsByClassName('keyframe');
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i].classList.contains('remove') == true) {
            keyframes[i].remove();
        }
    }
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