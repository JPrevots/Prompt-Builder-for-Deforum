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

        //console.log(promptCache);

        // Fix. If there is a globalPositivePrompt or globalNegativePrompt, it adds an entry for no reason, the fix removes it
        let exportLength;
        exportLength = (globalPositivePrompt || globalNegativePrompt) ? promptCache.length - 1 : promptCache.length;

        // Building json
        let prompt = '';
        for (let i = 0; i < exportLength; i++) { // Prevents adding a , at the end of the last entry
            prompt += (i == (exportLength - 1)) ? `${promptCache[i]}\n` : `${promptCache[i]},\n`;
        }
        return `{\n${prompt}}`;

        // Old export wihout fix
        // Building json
/*         let prompt = '';
        for (let i = 0; i < promptCache.length; i++) { // Prevents adding a , at the end of the last entry
            prompt += (i == (promptCache.length - 1)) ? `${promptCache[i]}\n` : `${promptCache[i]},\n`;
        }
        return `{\n${prompt}}`; */
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