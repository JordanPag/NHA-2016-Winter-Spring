require "dotenv"
Dotenv.load
require 'sendgrid-ruby'
include SendGrid

data = JSON.parse('{
  "personalizations": [
    {
      "to": [
        {
          "email": "thebluecat544@gmail.com"
        }
      ],
      "subject": "Hello World from the SendGrid Ruby Library!"
    }
  ],
  "from": {
    "email": "jpags2938@gmail.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "Hello, Email!"
    }
  ]
}')
sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
response = sg.client.mail._("send").post(request_body: data)
puts response.status_code
puts response.body
puts response.headers