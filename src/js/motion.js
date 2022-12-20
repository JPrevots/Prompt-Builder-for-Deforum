// Motion

function ifMotionNotEmpty() {

}

// Animations; Spreading simple moves to the corresponding field in the settings.txt (zoom, translation_x, rotation3d_z, etc...);
function moveCommand(startFrame, amount, span = 0, type) {
    let value;
    let frameNumber;

    for (let i = startFrame; i < (startFrame + span); i++) {
        if (span == 0) {
            value = amount;
        } else {
            value = amount / (span - (startFrame + i));
        }
        frameNumber = startFrame + i;
    }
    //return `(${frameNumber}): (${value})`
}

let motionTypes = {
    zoom: "",
    
}