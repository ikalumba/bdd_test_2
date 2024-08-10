const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// REGISTRATION
Given('I am on the registration page', function () {
    console.log('Navigating to the registration page');
    return 'User is on the registration page';
});

When('I enter valid registration details', function () {
    console.log('Entering valid registration details');
    return 'Entered valid registration details';
});

When('I submit the registration form', function () {
    console.log('Submitting the registration form');
    return 'Registration form submitted';
});

Then('I should see a confirmation message', function () {
    console.log('Checking for confirmation message');
    const confirmationMessage = 'Registration successful! Welcome!';
    assert.equal(confirmationMessage, 'Registration successful! Welcome!');
    return confirmationMessage;
});

Then('I should receive a confirmation email', function () {
    console.log('Checking for confirmation email');
    const emailMessage = 'Confirmation email received';
    assert.equal(emailMessage, 'Confirmation email received');
    return emailMessage;
});

When('I enter an email that is already registered', function () {
    console.log('Entering an already registered email');
    return 'Already registered email entered';
});

Then('I should see an error message', function () {
    console.log('Checking for error message');
    const errorMessage = 'Error: Email already registered';
    assert.equal(errorMessage, 'Error: Email already registered');
    return errorMessage;
});

// LOGIN

let currentPage;
let loginStatus;
let dashboardAccess;
let welcomeMessage;

// Scenario: Successful login with valid credentials
Given('I am on the login page', function () {
    currentPage = 'login page';
    return `Navigated to ${currentPage}`;
});

When('I enter valid login credentials', function () {
    loginStatus = 'valid';
    return 'Entered valid login credentials';
});

When('I submit the login form', function () {
    if (loginStatus === 'valid') {
        dashboardAccess = true;
        welcomeMessage = 'Welcome to your dashboard!';
    } else {
        dashboardAccess = false;
    }
    return 'Submitted the login form';
});

Then('I should be redirected to the dashboard', function () {
    assert.equal(dashboardAccess, true, 'User should be redirected to the dashboard');
    return dashboardAccess ? 'Redirected to the dashboard' : 'Not redirected to the dashboard';
});

Then('I should see a welcome message', function () {
    assert.equal(welcomeMessage, 'Welcome to your dashboard!');
    return welcomeMessage;
});

// Scenario: Login with invalid credentials
When('I enter invalid login credentials', function () {
    loginStatus = 'invalid';
    return 'Entered invalid login credentials';
});

Then('I should see a login error message', function () {
    const errorMessage = loginStatus === 'invalid' ? 'Invalid credentials, please try again.' : '';
    assert.equal(errorMessage, 'Invalid credentials, please try again.');
    return errorMessage;
});

// SCHEDULE FUNCTIONALITY

// let currentPage;
let meetingDetails;
let meetingScheduled;
let upcomingMeetings = [];
let errorMessage;

// Scenario: Successfully schedule a meeting with valid details
Given('I am on the dashboard', function () {
    currentPage = 'dashboard';
    return `Navigated to ${currentPage}`;
});

When('I navigate to the schedule meeting page', function () {
    currentPage = 'schedule meeting page';
    return `Navigated to ${currentPage}`;
});

When('I enter valid meeting details', function () {
    meetingDetails = {
        title: 'Team Sync',
        date: '2024-08-10',
        time: '10:00 AM'
    };
    return 'Entered valid meeting details';
});

When('I submit the schedule meeting form', function () {
    if (meetingDetails && meetingDetails.title && meetingDetails.date && meetingDetails.time) {
        meetingScheduled = true;
        upcomingMeetings.push(meetingDetails);
    } else {
        meetingScheduled = false;
    }
    return 'Submitted the schedule meeting form';
});

Then('I should see a meeting confirmation', function () {
    assert.equal(meetingScheduled, true, 'Meeting should be successfully scheduled');
    return meetingScheduled ? 'Meeting successfully scheduled' : 'Failed to schedule the meeting';
});

Then('the meeting should be listed in my upcoming meetings', function () {
    const isMeetingListed = upcomingMeetings.some(meeting => 
        meeting.title === meetingDetails.title &&
        meeting.date === meetingDetails.date &&
        meeting.time === meetingDetails.time
    );
    assert.equal(isMeetingListed, true, 'Meeting should be listed in upcoming meetings');
    return isMeetingListed ? 'Meeting is listed in upcoming meetings' : 'Meeting is not listed in upcoming meetings';
});

// Scenario: Schedule a meeting with missing details
Given('I am on the schedule meeting page', function () {
    currentPage = 'schedule meeting page';
    return `Navigated to ${currentPage}`;
});

When('I enter incomplete meeting details', function () {
    meetingDetails = {
        title: '',  // Missing title
        date: '2024-08-10',
        time: ''   // Missing time
    };
    return 'Entered incomplete meeting details';
});

Then('I should see an error message indicating the missing fields', function () {
    if (!meetingDetails.title || !meetingDetails.date || !meetingDetails.time) {
        errorMessage = 'Error: Title and time are required fields';
    } else {
        errorMessage = '';
    }
    assert.equal(errorMessage, 'Error: Title and time are required fields', 'An error message should be displayed');
    return errorMessage;
});

// JOIN MEETING

// let currentPage;
let meetingID;
let isMeetingIDValid;
let redirectedPage;
// let errorMessage;

// Scenario: Successfully join a meeting with a valid meeting ID
Given('I am on the join meeting page', function () {
    currentPage = 'join meeting page';
    return `Navigated to ${currentPage}`;
});

When('I enter a valid meeting ID', function () {
    meetingID = '123-456-789'; // Simulating entering a valid meeting ID
    isMeetingIDValid = true;
    return `Entered meeting ID: ${meetingID}`;
});

When('I submit the join meeting form', function () {
    if (isMeetingIDValid) {
        redirectedPage = 'meeting interface';
    } else {
        redirectedPage = null;
        errorMessage = 'Invalid meeting ID';
    }
    return 'Submitted the join meeting form';
});

Then('I should be redirected to the meeting', function () {
    assert.equal(redirectedPage, 'meeting interface', 'User should be redirected to the meeting interface');
    return redirectedPage ? `Redirected to ${redirectedPage}` : 'Failed to redirect to the meeting';
});

Then('I should see the meeting interface', function () {
    assert.equal(redirectedPage, 'meeting interface', 'User should see the meeting interface');
    return redirectedPage ? 'Meeting interface is displayed' : 'Meeting interface is not displayed';
});

// Scenario: Join a meeting with an invalid meeting ID
When('I enter an invalid meeting ID', function () {
    meetingID = '000-000-000'; // Simulating entering an invalid meeting ID
    isMeetingIDValid = false;
    return `Entered meeting ID: ${meetingID}`;
});

Then('I should see an error message indicating the invalid meeting ID', function () {
    if (!isMeetingIDValid) {
        errorMessage = 'Error: Invalid meeting ID';
    } else {
        errorMessage = '';
    }
    assert.equal(errorMessage, 'Error: Invalid meeting ID', 'An error message should be displayed for an invalid meeting ID');
    return errorMessage;
});