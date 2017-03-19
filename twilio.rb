require 'rubygems' # not necessary with ruby 1.9 but included for completeness
require 'twilio-ruby'

# put your own credentials here
account_sid = 'AC0b2709e1a8c606ac462a23a42eede596'
auth_token = '400a7dd3a323fb0dc5c72a8803f722be'

# set up a client to talk to the Twilio REST API
@client = Twilio::REST::Client.new(account_sid, auth_token)
@account = @client.account

@account.messages.create(
  from: '+19176344130',
  to: '9174503711',
  body: ''
)