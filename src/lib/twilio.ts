const accountSid: string = process.env.TWILIO_ACCOUNT_SID || ""
const authToken: string = process.env.TWILIO_AUTH_TOKEN || ""

const twilio = require("twilio")(accountSid, authToken)

export default twilio
