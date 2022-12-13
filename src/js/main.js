// Prompt maker for Deforum

import {mainContentHandler} from "./viewsHandler.js";
import {addKeyframeStart, addKeyframeEnd, addKeyframeBefore, addKeyframeAfter, 
    moveStart, moveEnd, moveBefore, moveAfter, duplicateKeyframe, deleteKeyframe, 
    copyPromptToClipboard, savePromptToFile, resetFrame} from "./buttons.js";

window.mainContentHandler = mainContentHandler;
window.addKeyframeStart = addKeyframeStart;
window.addKeyframeEnd = addKeyframeEnd;
window.addKeyframeBefore = addKeyframeBefore;
window.addKeyframeAfter = addKeyframeAfter;
window.moveStart = moveStart;
window.moveEnd = moveEnd;
window.moveBefore = moveBefore;
window.moveAfter = moveAfter;
window.duplicateKeyframe = duplicateKeyframe;
window.deleteKeyframe = deleteKeyframe;
window.copyPromptToClipboard = copyPromptToClipboard;
window.savePromptToFile = savePromptToFile;
window.resetFrame = resetFrame;

const keyframesOnLoad = 2;

window.onload = () => {
    addFramesOnStart();
}

function addFramesOnStart() {
    for (let i = 0; i < keyframesOnLoad; i++) {
        addKeyframeEnd();
    }
}