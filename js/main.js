// Prompt maker for Deforum v0.3
// https://github.com/JPrevots/Prompt-Builder-for-Deforum

import {mainContentHandler} from "./viewsHandler.js";
import {addKeyframeStart, addKeyframeEnd, addKeyframeBefore, addKeyframeAfter, 
    moveStart, moveEnd, moveBefore, moveAfter, deleteKeyframe, 
    copyPromptToClipboard, savePromptToFile, resetFrame, reorderFrameNumber, 
    addMultipleFrames, saveConfig, eventNumber, duplicateStart, duplicateBefore, duplicateEnd, seedExport, updateState } from "./buttons.js";
import Sortable from './sortable.esm.js';

window.mainContentHandler = mainContentHandler;
window.addKeyframeStart = addKeyframeStart;
window.addKeyframeEnd = addKeyframeEnd;
window.addKeyframeBefore = addKeyframeBefore;
window.addKeyframeAfter = addKeyframeAfter;
window.moveStart = moveStart;
window.moveEnd = moveEnd;
window.moveBefore = moveBefore;
window.moveAfter = moveAfter;
window.deleteKeyframe = deleteKeyframe;
window.copyPromptToClipboard = copyPromptToClipboard;
window.savePromptToFile = savePromptToFile;
window.resetFrame = resetFrame;
window.duplicateStart = duplicateStart;
window.reorderFrameNumber = reorderFrameNumber;
window.addMultipleFrames = addMultipleFrames;
window.generateFramesAndReorder = generateFramesAndReorder;
window.saveConfig = saveConfig;
window.eventNumber = eventNumber;
window.updateState = updateState;
window.textAreaAutoExpand = textAreaAutoExpand;
window.duplicateBefore = duplicateBefore;
window.duplicateEnd = duplicateEnd;
window.duplicateStart = duplicateStart;
window.seedExport = seedExport;
window.changeButtonColorOnChecked = changeButtonColorOnChecked;
window.updateState = updateState;
window.changeLockIcon = changeLockIcon;

// Makes the prompt draggable
const sortableFrames = document.getElementById('promptContainer');
const frameNumbers = document.getElementsByClassName('frameNumber'); // HTML collection

function frameNumbersArray() {
    let values = [];
    // Why frameNumbers.length - 2 ? no idea.
    for (let i = 0; i < frameNumbers.length - 2; i++) {
        values.push(Number(frameNumbers[i].value));
    }
    return values
}

new Sortable(sortableFrames, {
    animation: 150,
    forceFallback: true,
    handle: ".firstrow",
    // Element dragging started
	onChange: function () {
        updateState();
	}
});

window.onload = () => {
    addFramesOnStart();
    updateState();
    checkSeedFlag();
}

// https://stackoverflow.com/questions/17772260/textarea-auto-height
function textAreaAutoExpand(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

const keyframesOnLoad = 4;

// Hide the seed schedule feature
const seedFlag = false;
function checkSeedFlag() {
    if (seedFlag) {
        let element = document.getElementsByClassName('seedFlag');
        for (let i = 0; i < element.length; i++) {
            element[i].classList.remove("d-none");
        }
    }
}

function addFramesOnStart() {
    for (let i = 0; i < keyframesOnLoad; i++) {
        addKeyframeEnd('prompt');
        //addKeyframeEnd('motion');
    }
}

function generateFramesAndReorder() {
    addMultipleFrames();
    reorderFrameNumber();
}

// This function inverts the label color if checked by changing bootstrap class
// Change color of the LABEL not the INPUT. The id should be the one of the label e.g :
// <input type="checkbox" class="btn-check" id="autoPattern" autocomplete="off" onclick="changeButtonColorOnChecked(event)">
// <label class="btn btn-primary" id="autoPatternLabel" for="autoPattern">Auto</label>
function changeButtonColorOnChecked(event) {
    let id = event.target.id;
    let input = document.getElementById(id); // Id of the input
    let label = document.getElementById(`${id}Label`); // The id of the label should be named like this
    (input.checked) ? label.classList.replace('btn-secondary', 'btn-danger') : label.classList.replace('btn-danger', 'btn-secondary');
}

function changeLockIcon(event) {
    let element = event.target;
    // Change icon
    element.classList.contains('bi-lock-fill') ? element.classList.replace('bi-lock-fill', 'bi-unlock-fill') : element.classList.replace('bi-unlock-fill', 'bi-lock-fill' );
    // Change background color
    element.classList.contains('bi-lock-fill') ? element.classList.replace('btn-secondary', 'btn-success') : element.classList.replace('btn-success', 'btn-secondary');
}