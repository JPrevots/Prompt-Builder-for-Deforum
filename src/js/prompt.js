// Prompt

export function promptBuilder() {
    let globalPositivePrompt = (document.getElementById('globalPositivePrompt').value).trim();
    let globalNegativePrompt = (document.getElementById('globalNegativePrompt').value).trim();
    let globalPositiveFirst = document.getElementById("globalPositiveFirstButton");
    let globalNegativeFirst = document.getElementById("globalNegativeFirstButton");
    let positivePromptCache = document.getElementsByClassName('positivePrompt');
    let negativePromptCache = document.getElementsByClassName('negativePrompt');
    let frameNumberCache = document.getElementsByClassName('frameNumber');
    let promptCache = [];

    if (positivePromptCache.length != 0) {
        for (let i = 0; i < positivePromptCache.length; i++) {
            let frameNumber = frameNumberCache[i].value;
            let specificPositivePrompt = (positivePromptCache[i].value).trim();
            let specificNegativePrompt = (negativePromptCache[i].value).trim();

            let negativePrompt = "";
            let positivePrompt = "";
            
            // Prevents inserting "--neg" if there is no negative prompt
            if (globalNegativePrompt || specificNegativePrompt) {
                if (globalNegativeFirst.checked == true) {
                    negativePrompt = `--neg ${globalNegativePrompt} ${specificNegativePrompt}`;
                } else {
                    negativePrompt = `--neg ${specificNegativePrompt} ${globalNegativePrompt}`;
                }
            }

            if (globalPositiveFirst.checked == true) {
                positivePrompt = `${globalPositivePrompt} ${specificPositivePrompt}`;
            } else {
                positivePrompt = `${specificPositivePrompt} ${globalPositivePrompt}`;
            }

            // Cleaning up trailing spaces
            let promptEntry = (`${positivePrompt} ${negativePrompt}`).trim();
            promptEntry = promptEntry.replace(/  +/g, ' '); // Replaces two spaces with only one

            // Prevents export of empty prompt
            if (promptEntry) {
                let fullPrompt = `    "${frameNumber}": "${promptEntry}"`
                promptCache.push(fullPrompt);
            }
        }

        // Building json
        let prompt = "{\n";
        for (let i = 0; i < promptCache.length; i++) {
            // Prevents adding a , at the end of the last entry
            if (i == (promptCache.length - 1)) {
                prompt += `${promptCache[i]}`;
                prompt += "\n";
            } else {
                prompt += `${promptCache[i]}`;
                prompt += ",\n";
            }
        }
        prompt += "}";

        //JSON.stringify(fullPromptJson);
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