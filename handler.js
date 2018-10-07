"use strict";

const AWS = require("aws-sdk");

function sendMail(formData, context) {
  AWS.config.update({ region: "us-west-2" }); // This should match with the configuration from serverless.yml
  let params = {};
  params["Source"] = formData.contact_to;
  params["Destination"] = { ToAddresses: [formData.contact_to] };
  params["ReplyToAddresses"] = [formData.reply_to];
  params["Message"] = {
    Subject: {
      Charset: "UTF-8",
      Data: "New contact request at " + formData.website
    },
    Body: {
      Text: {
        Charset: "UTF-8",
        Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${
          formData.reply_to
        }`
      }
    }
  };

  const sendPromise = new AWS.SES({
    apiVersion: "2010-12-01"
  })
    .sendEmail(params)
    .promise();

  sendPromise
    .then(data => {
      console.log(data.MessageId);
      context.done(null, "Success");
    })
    .catch(err => {
      console.error(err, err.stack);
      context.done(null, "Failed");
    });
  return 1;
}

module.exports.contactFormMailer = (event, context, callback) => {
  let data = JSON.parse(event.body);
  let responseStatus = 200;
  let responseMessage = "";
  if (data.contact_to == undefined) {
    responseStatus = 400;
    responseMessage = "contact_to field is incorrect";
  } else if (data.reply_to == undefined) {
    responseStatus = 400;
    responseMessage = "reply_to field is incorrect";
  } else if (data.message == undefined) {
    responseStatus = 400;
    responseMessage = "message field is incorrect";
  } else if (data.name == undefined) {
    responseStatus = 400;
    responseMessage = "name field is incorrect";
  } else if (data.website == undefined) {
    responseStatus = 400;
    responseMessage = "website field is incorrect";
  } else {
    let _ = sendMail(data, context);
  }

  callback(null, {
    statusCode: responseStatus,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      message: responseMessage,
      input: event
    })
  });
};
