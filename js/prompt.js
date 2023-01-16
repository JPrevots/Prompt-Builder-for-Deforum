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

    // Only export if there is at least one positive prompt
    if (positivePromptCache.length != 0) {
        for (let i = 0; i < positivePromptCache.length; i++) {
            let frameNumber = frameNumberCache[i].value;

            // Remove trailing spaces
            let specificPositivePrompt = (positivePromptCache[i].value).trim();
            let specificNegativePrompt = (negativePromptCache[i].value).trim();

            let negativePrompt = "";
            let positivePrompt = "";

            // Quick Fix. Check for empty string on specific prompts. Prevents exporting an empty prompt with only global prompts
            if (!specificPositivePrompt && !specificNegativePrompt) {continue;}

            // Prevents inserting "--neg" if there is no negative prompt
            if (globalNegativePrompt || specificNegativePrompt) {
                if (globalNegativeFirst.checked) {
                    negativePrompt = `--neg ${globalNegativePrompt} ${specificNegativePrompt}`;
                } else {
                    negativePrompt = `--neg ${specificNegativePrompt} ${globalNegativePrompt}`;
                }
            }

            if (globalPositiveFirst.checked) {
                positivePrompt = `${globalPositivePrompt} ${specificPositivePrompt}`;
            } else {
                positivePrompt = `${specificPositivePrompt} ${globalPositivePrompt}`;
            }

            // Remove trailing spaces
            let promptEntry = (`${positivePrompt} ${negativePrompt}`).trim();
            promptEntry = promptEntry.replace(/  +/g, ' '); // Replaces two spaces with only one

            // Prevents export of empty prompt
            if (promptEntry) {
                let fullPrompt = `    "${frameNumber}": "${promptEntry}"`
                promptCache.push(fullPrompt);
            }
        }

        // Building json
        let prompt = '';
        for (let i = 0; i < promptCache.length; i++) { // Prevents adding a , at the end of the last entry
            prompt += (i == (promptCache.length - 1)) ? `${promptCache[i]}\n` : `${promptCache[i]},\n`;
        }
        return `{\n${prompt}}`;
    }
}