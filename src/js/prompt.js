// Prompt

export function promptBuilder() {
    let globalPositivePrompt = (document.getElementById('globalPositivePrompt').value).trim();
    let globalNegativePrompt = (document.getElementById('globalNegativePrompt').value).trim();
    //let keyframes = document.getElementsByClassName('promptKeyframe');
    let frameNumberCache = document.getElementsByClassName('frameNumber');
    let positivePromptCache = document.getElementsByClassName('positivePrompt');
    let negativePromptCache = document.getElementsByClassName('negativePrompt');
    let settingsprompt = [];
    let globalNegativeFirst = document.getElementById("globalNegativeFirstButton");
    let globalPositiveFirst = document.getElementById("globalPositiveFirstButton");

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


        //JSON.stringify(fullPromptJson);

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