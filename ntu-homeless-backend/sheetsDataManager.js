const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

var dataStructure = require("./dataStructure");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// variables set up
var totalEntries = 0;
var total = {
  approved: {},
  not_approved: {},
  num_approved: 0,
  num_not_approved: 0,
};

// preserve variables
var google_credentials = {};

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  google_credentials = content;
});

setInterval(() => {
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(google_credentials), parseData);
}, process.env.POLLING_RATE);

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function parseData(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: "170nW9rdQvzzgIQP_TANWgqgakaDqQgE6N111oMBkEwU",
      range: "Sheet1!A2:L",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
      console.log(
        new Date(Date.now()).toUTCString() +
          ": The API returned " +
          rows.length +
          " rows"
      );

      if (totalEntries === rows.length) {
        return;
      } else {
        totalEntries = rows.length;
        if (rows.length) {
          // TODO: ADD PREPROCESSING TO REMOVE OLD DUPLICATES
          var new_rows = [];
          var idArray = [];
          for (i = rows.length - 1; i >= 0; i--) {
            row = rows[i];
            var target_id = row[1];

            if (new_rows.length === 0 || !idArray.includes(target_id)) {
              idArray.push(row[1]);
              new_rows.push(row);
            }
          }
          //

          total.num_approved = 0;
          total.num_not_approved = 0;
          dataStructure.forEach((element) => {
            total.approved[element.question] = {};
            total.not_approved[element.question] = {};
            element.options.forEach((element2) => {
              total.approved[element.question][`${element2}`] = 0;
              total.not_approved[element.question][`${element2}`] = 0;
            });
          });

          new_rows.forEach((row) => {
            switch (row[8]) {
              case "Allocated": {
                total.num_approved += 1;
                dataStructure.forEach((element, idx) => {
                  element.options.forEach((opt) => {
                    if (row[idx + 2] === opt) {
                      total.approved[element.question][opt] += 1;
                    }
                  });
                });
                break;
              }
              case "Allocated (Processing)": {
                total.num_approved += 1;
                dataStructure.forEach((element, idx) => {
                  element.options.forEach((opt) => {
                    if (row[idx + 2] === opt) {
                      total.approved[element.question][opt] += 1;
                    }
                  });
                });
                break;
              }
              case "Not Allocated": {
                total.num_not_approved += 1;
                dataStructure.forEach((element, idx) => {
                  element.options.forEach((opt) => {
                    if (row[idx + 2] === opt) {
                      total.not_approved[element.question][opt] += 1;
                    }
                  });
                });
                break;
              }
              case "Not Allocated (Received Wait-list email)": {
                total.num_not_approved += 1;
                dataStructure.forEach((element, idx) => {
                  element.options.forEach((opt) => {
                    if (row[idx + 2] === opt) {
                      total.not_approved[element.question][opt] += 1;
                    }
                  });
                });
                break;
              }
              case "Successfully Prioritised": {
                total.num_not_approved += 1;
                dataStructure.forEach((element, idx) => {
                  element.options.forEach((opt) => {
                    if (row[idx + 2] === opt) {
                      total.not_approved[element.question][opt] += 1;
                    }
                  });
                });
                break;
              }
              case "Balloting at a Later Date": {
                total.num_not_approved += 1;
                dataStructure.forEach((element, idx) => {
                  element.options.forEach((opt) => {
                    if (row[idx + 2] === opt) {
                      total.not_approved[element.question][opt] += 1;
                    }
                  });
                });
                break;
              }
              default: {
                break;
              }
            }
          });
        }
      }
    }
  );
}

module.exports = total;
