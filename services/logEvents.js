const { format, getYear } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Function to handle logging events
const logEvents = async (req, event, level, message) => {
  // Get the current date and time in the desired format
  const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  // Extract meaningful information from loggedInUser or set to "Guest" if not available
  let loggedInUser = 'Guest';
  if (req.app.locals.loggedInUser) {
    loggedInUser = req.app.locals.loggedInUser.username; // Replace 'username' with the actual property containing the user information
  }

  // Create the log event string with the provided loggedInUser, event, level, message, and a unique identifier
  const logEvent = `${dateTime}\t${event}\t${loggedInUser}\t${message}\t${uuid()}`;
  
  // Log the event to the console
  console.log(logEvent);

  try {
    // Create the folder path based on the current year
    const currFolder = 'logs/' + getYear(new Date());

    // Check if the folder exists, and if not, create it
    if (!fs.existsSync(path.join(__dirname, currFolder))) {
      console.log(`Creating folder: ${currFolder}`);
      await fsPromises.mkdir(path.join(__dirname, currFolder), { recursive: true });
    }

    // Create the log file name based on the current date
    const fileName = `${format(new Date(), 'yyyy-MM-dd')}_http_events.log`;

    // Append the log event to the log file
    await fsPromises.appendFile(path.join(__dirname, currFolder, fileName), logEvent + '\n');
  } catch (err) {
    console.log(err);
  }
};

// Exporting the logEvents function to be used in other modules
module.exports = logEvents;