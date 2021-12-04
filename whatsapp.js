const core = require("@actions/core");
const { default: axios } = require("axios");

const env = process.env;

const MESSAGE = core.getInput("message");
const WHATSAPP_NUMBER = core.getInput("whatsapp-number");
const VONAGE_NUMBER = core.getInput("vonage-number");
const API_KEY = core.getInput("API_KEY");
const API_SECRET = core.getInput("API_SECRET");

const messageToSend =
    `${MESSAGE}\n\n` +
    `Repository: ${env.GITHUB_REPOSITORY}\n` +
    `Workflow name: ${env.GITHUB_WORKFLOW}\n` +
    `Job name: ${env.GITHUB_JOB}`;

(async () => {
    try {
        await axios({
            method: "post",
            url: "https://messages-sandbox.nexmo.com/v0.1/messages",
            auth: {
                username: API_KEY,
                password: API_SECRET,
            },
            data: {
                from: {
                    type: "whatsapp",
                    number: VONAGE_NUMBER,
                },
                to: {
                    type: "whatsapp",
                    number: WHATSAPP_NUMBER,
                },
                message: {
                    content: {
                        type: "text",
                        text: messageToSend,
                    },
                },
            },
        });
    } catch (error) {
        core.setFailed(error.message);
    }
})();
