// Prompt maker for Deforum v0.3
// https://github.com/JPrevots/Prompt-Builder-for-Deforum

import {mainContentHandler} from "./viewsHandler.js";
import {addKeyframeStart, addKeyframeEnd, addKeyframeBefore, addKeyframeAfter, 
    moveStart, moveEnd, moveBefore, moveAfter, deleteKeyframe, 
    copyPromptToClipboard, savePromptToFile, resetFrame, reorderFrameNumber, 
    addMultipleFrames, saveConfig, eventNumber, duplicateStart, duplicateBefore, duplicateEnd } from "./buttons.js";

import Sortable from './sortable.esm.js';
// Makes the prompt draggable
const sortableFrames = document.getElementById('promptContainer');
new Sortable(sortableFrames, {
    animation: 150,
    forceFallback: true
});

// https://stackoverflow.com/questions/17772260/textarea-auto-height
function textAreaAutoExpand(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

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

const keyframesOnLoad = 4;

window.onload = () => {
    addFramesOnStart();
    eventNumber();
    reorderFrameNumber();
}

// Not too sure about this one, might have to ask for feedback
function updateState() {
    eventNumber();
    reorderFrameNumber();
}

function addFramesOnStart() {
    for (let i = 0; i < keyframesOnLoad; i++) {
        addKeyframeEnd('prompt');
        addKeyframeEnd('motion');
    }
}

function generateFramesAndReorder() {
    addMultipleFrames();
    reorderFrameNumber();
}

/* const globalButtons = document.getElementsByClassName('globalButton');
function changeGlobalButtonColorOnClick() {
    for (let i in globalButtons) {

    }
} */