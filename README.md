# helllicht/slack-message

## Get all channel ID's
**Option a)**

To get the Slack Channel ID you can use the browser version of slack, then you can copy the channel id from URL.

**Option b)**

Use the GetChannelCommand.js => `$ node GetChannelCommand.js` the script asks for your token and make a request.


## Required secret
+ Bot User OAuth Access Token
    + Looks like: `xoxb-1234234-22342342432-blablablafoobar`

## Required Permissions (Scopes)
| OAuth Scope          | Description                                                                  |
|----------------------|------------------------------------------------------------------------------|
| channels:read        | View basic information about public channels in a workspace                  | 
| chat:write           | Send messages as @bot                                       | 
| chat:write.customize | Send messages as @bot with a customized username and avatar | 
| chat:write.public    | Send messages to channels @bot isn't a member of            | 

INFO:
If new scopes are added to the bot, the app needs to be "reinstalled" in slack to get the additional permissions
