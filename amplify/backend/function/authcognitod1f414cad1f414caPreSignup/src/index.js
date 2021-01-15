const AWS = require("aws-sdk");
AWS.config.region = "eu-west-2";

const identity = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event, context, callback) => {
  if (event.request.userAttributes.email) {
    const { preferred_username } = event.request.userAttributes;
    const userParams = {
      UserPoolId: event.userPoolId,
      AttributesToGet: ["preferred_username"],
      Filter: `preferred_username = \"${preferred_username}\"`,
      Limit: 1,
    };
    try {
      const { Users } = await identity.listUsers(userParams).promise();
      console.log({ Users });
      if (Users && Users.length > 0) {
        callback("UsernameExistsException", null);
      } else {
        callback(null, event);
      }
    } catch (error) {
      console.log({ error }, JSON.stringify(error));
      callback({ error }, null);
    }
  } else {
    callback("MissingParameters", null);
  }
};
