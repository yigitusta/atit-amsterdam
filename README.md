# Front-end Developer Assessment

Thank you for taking the time to conduct the All Things IT assessment for front-end developers. The purpose of which is to give us insight in your technical abilities, development approach and general technical working habits.

The assessment consists of an assignment, to prepare beforehand and intended to take approximately 5-8 hours, and an per-email or in-person discussion of your solution. We view your performance on this assessment as indicative of the work you will deliver as a front-end developer at All Things IT.

The assignment is the ‘Get a golden ticket to Amsterdam’, described below. Read the case carefully, and approach it as you would a regular project. Consider aspects such as robustness, maintainability, testing and user experience. The assignment should be implemented as a single-page application using React, any API dependencies can be mocked away.
It is recommended that you take [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate) to help you taking away the pain of setting up a working environment. However, feel free to use another repository or to start from scratch.

You can deliver your work by emailing this repository with your solution to your contact person. Your solution will not be kept after the assessment and will not be used by All Things IT. Please note that the case is purely fictional and will not be used for the actual application procedure. Furthermore, we ask you to treat this assessment as confidential so we can apply the scenario to future candidates as well.

Good luck with the assignment!

## Assignment: ‘Get a golden ticket to Amsterdam’

Background: To attract new developers All Things IT launched a campaign to get the attention of high quality software engineers. However, the amount of candidates is too high and the company has to decide which developer can come to Amsterdam. It chooses to let faith decide. All thousand candidates will receive a code, one of which is the lucky one.

This assignment is split up into two user-stories.

#### ATIT-1: As All Things IT I would like to have 1000 pregenerated codes to send to potential candidates.

The promotion code should be of the following format:

- Nine numerical characters
- When multiplying the first number by 9, the second by 8, the third by 7, and so on... the resulting number should be divisible by 11 and a single digit may not appear more than twice.

Examples:

- 613884922 is valid, because 6 * 9 + 1 * 8 + 3 * 7 + 8 * 6 + 8 * 5 + 4 * 4 + 9 * 3 + 2 * 2 + 2 * 1 = 220 / 11 = 20 (whole number, no digit is repeated 3+ times)
- 538820102 is invalid, because 5 * 9 + 3 * 8 + 8 * 7 + 8 * 6 + 2 * 5 + 0 * 4 + 1 * 3 + 0 * 2 + 2 * 1 = 188 / 11 = 17.09 (not a whole number)
- 131888331 is invalid (digits 1, 3 and 8 appear too often)

Note: you can store the 1000 codes in any format. Please also keep the source code by which you generated them.

#### ATIT-2: As a candidate developer I want to be able to enter my personal information and promotion code to see if I've the golden ticket.

You can use the design and assets found in this repository. Please don’t spend too much time in making it pixel perfect.

The form should consist of:

- Firstname + Surname fields
- Email address field
- Promotion code field
- Checkbox agreeing to the use of the e-mail address for contacting

Validation rules:

- All fields are required, a warning should be shown if left empty on blur
- The firstname field should contain only alphabetic characters and be at least two characters in length
- The email field should be validated for a valid email address
- The code that can be entered should be valid (use the rules from ATIT-1)

When the user clicks submit:

- The form should be validated
- An api call should be made (sending all form data) to check if the entered code is the winning one (note: the api itself can be mocked, but please do write the front-end code required to make the api call)
- Show either a “You won” or a “Better luck next time” screen. Since there is no actual api, make the user win randomly 1/10th of the time.
