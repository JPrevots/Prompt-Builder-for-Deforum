// Prompt

export function promptBuilder() {
    let globalPositivePrompt = (document.getElementById('globalPositivePrompt').value).trim();
    let globalNegativePrompt = (document.getElementById('globalNegativePrompt').value).trim();
    let keyframes = document.getElementsByClassName('keyframe');
    let promptCache = document.getElementsByClassName('prompt');
    let frameNumberCache = document.getElementsByClassName('frameNumber');
    let negativePromptCache = document.getElementsByClassName('negativePrompt');
    let settingsprompt = [];

    if (keyframes.length != 0) {
        for (let i = 0; i < keyframes.length; i++) {
            let frameNumber = frameNumberCache[i].value;
            let specificPositivePrompt = (promptCache[i].value).trim();
            let specificNegativePrompt = (negativePromptCache[i].value).trim();

            let negativePrompt = "";
            // Prevents inserting "--neg" if there is no negative prompt
            if (globalNegativePrompt || specificNegativePrompt) {
                negativePrompt = `--neg ${globalNegativePrompt} ${specificNegativePrompt}`;
            }

            let positivePrompt = `${globalPositivePrompt} ${specificPositivePrompt}`;

            let promptEntry = (`${positivePrompt} ${negativePrompt}`).trim();
            promptEntry = promptEntry.replace(/  +/g, ' '); // Replaces two spaces with only one

            // Prevents export of empty prompt
            if (promptEntry) {
                let fullPrompt = `    "${frameNumber}": "${promptEntry}"`
                settingsprompt.push(fullPrompt);
            }
        }

        // Building json
        let prompt = "{\n";
        for (let i = 0; i < settingsprompt.length; i++) {
            if (i == (settingsprompt.length - 1)) {
                prompt += `${settingsprompt[i]}`;
                prompt += "\n";
            } else {
                prompt += `${settingsprompt[i]}`;
                prompt += ",\n";
            }
        }
        prompt += "}";

        console.log(prompt);
        return prompt
    }
}

// Removes unwanted symbols that would throw an error in webUI
// Replaces . with ,
// = ' " , ; ²
function sanityCheck(string) {
    string = string.replace(/.+/g, ','); // Replaces . with ,
    string = string.replace(/  +/g, ' '); // Replaces two spaces with only one
    string = string.replace(/[]+/g, '');
    string = JSON.parse
}