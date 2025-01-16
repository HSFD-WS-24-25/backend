const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");
const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
const senderEmail = process.env.COMMUNICATION_SERVICES_SENDER_EMAIL;

if (!connectionString) {
    throw new Error("No valid connection string found in the environment variable COMMUNICATION_SERVICES_CONNECTION_STRING");
}
const emailClient = new EmailClient(connectionString);

async function sendEmail(recipients = null, content = null) {
    if (!areRecipientsValid(recipients)) {
        throw new Error("Invalid recipients! Recipients must be an array of objects with email property.");
    }
    if (!isContentValid(content)) {
        throw new Error("Invalid content! Content must have a subject and either plainText or html property.");
    }

    const POLLER_WAIT_TIME = 10
    try {
        const message = {
            senderAddress: senderEmail,
            content: {
                subject: content.subject || "(No subject)",
                plainText: content.plainText || "",
                html: content.html || "",
            },
            recipients: {
                to: recipients.map((recipient) => ({
                    address: recipient.email,
                    displayName: recipient.displayName || null,
                })),
            },
        };

        const poller = await emailClient.beginSend(message);

        if (!poller.getOperationState().isStarted) {
            throw "Poller was not started."
        }

        let timeElapsed = 0;
        while (!poller.isDone()) {
            poller.poll();
            console.log("Email send polling in progress");

            await new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
            timeElapsed += 10;

            if (timeElapsed > 18 * POLLER_WAIT_TIME) {
                throw "Polling timed out.";
            }
        }

        if (poller.getResult().status === KnownEmailSendStatus.Succeeded) {
            console.log(`Successfully sent the email (operation id: ${ poller.getResult().id })`);
        } else {
            throw poller.getResult().error;
        }
    } catch (e) {
        console.log(e);
    }
}

function areRecipientsValid(recipients) {
    if (!recipients || !Array.isArray(recipients) || 0 === recipients.length) {
        return false;
    }

    for (let recipient of recipients) {
        if (!recipient.email) {
            return false;
        }
    }

    return true;
}

function isContentValid(content) {
    if (!content?.subject) {
        return false;
    }

    if (!content.plainText && !content.html) {
        return false;
    }

    return true;
}

module.exports = { sendEmail };