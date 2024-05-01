This tool was created by me to help track application statuses. It consists of a spreadsheet that has 3 separate pages. 
The AppScript will look for the value Yes in the "Interview", "Rejected", and "Ghosted" columns on the spreadsheet and move the row to the appropriate page automatically.

Notes:
As of right now, this will only work in Google Sheets. There are also some additional steps to get the script working correctly. Here is a step by step guide on how to get started.

1. Open google sheets and create a blank spreadsheet.
2. Find Application Tracker Template and import the file into google sheets
3. Once you have finished step 2 (assuming you have already cloned the repository) open up the moveRowsBasedOnStatus.js file in VSCode or your preferred editor and copy all of the code.
4. In your spreadsheet, click on "Extensions", then click "Apps Script" and paste the code from moveRowsBasedOnStatus.js into the editor and click the floppy disk icon to save.
5. Once you have finished with step 4, click the clock icon on the left hand side. This should bring up the "Triggers" menu.
6. Under "Choose which function to run", select onEdit. Under "Which runs at deployment" select "Head". Under "Select Event Source", select "From spreadsheet". Under "Select event type" select "On change"
7. Hit save under the triggers section.
8. Currently, you must fill out the "Company", "Title", "Link" and "Date" fields with the appropriate information manually. I am currently working on a program which scrapes the web and populates these things automatically. This will come in a future version.

If you have any questions on how to use this tool, please reach out to me and I would be happy to answer any questions.
