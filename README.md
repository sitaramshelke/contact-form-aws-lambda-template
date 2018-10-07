# Serverless Contact us form template with AWS Lambda

1. Follow the Get Started from [Serverless](https://serverless.com/framework/docs/providers/aws/guide/quick-start/), Generate default serverless config.
2. Create a verified email as contact email for your AWS SES service.
3. Replace Serverless config file with the [serverless.yml](serverless.yml).
4. Replace Handler code with [handler.js](handler.js).
5. Use the example [form](example_form/form.html) and update `LAMBDA_URL`, `contactTo` and `myDomain`.
6. Otherwise, make sure you POST the following json in lambda request.

```json
{
  "name": "Sitaram",
  "reply_to": "sitaram@example.com",
  "message": "Very important message.",
  "website": "example.com",
  "contact_to": "contact@example.com"
}
```

6. Once you have lambda set up for the first time, just update fields `website` and `contact_to` for you next contact us form and domain with a new email.
