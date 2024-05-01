function onEdit(e) {
  // Check if the event object is defined
  if (e && e.range) {
    var editedRange = e.range;
    var editedSheet = editedRange.getSheet();
    var editedRow = editedRange.getRow();
    var editedColumn = editedRange.getColumn();
    
    var jobApplicationsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("job_applications");
    var inactiveApplicationsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("inactive_applications");
    var interviewsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("interviews");

    // Get the column names
    var interviewColumnName = "Interview";
    var ghostedColumnName = "Ghosted";
    var rejectedColumnName = "Rejected";

    // Check if the edit occurred in the "job_applications" sheet and in the relevant columns
    if (editedSheet.getName() === "job_applications") {
      var columnName = editedSheet.getRange(1, editedColumn).getValue();
      if (columnName === interviewColumnName || columnName === ghostedColumnName || columnName === rejectedColumnName) {
        moveRowsToInactiveApplications(jobApplicationsSheet, inactiveApplicationsSheet, editedRow);
        moveRowsToInterviews(jobApplicationsSheet, interviewsSheet, editedRow);
      }
    }
  }
}

function moveRowsToInterviews(jobApplicationsSheet, interviewsSheet, editedRow) {
  var interviewColumnName = "Interview";
  var sourceRange = jobApplicationsSheet.getDataRange();
  var sourceValues = sourceRange.getValues();
  var numRows = sourceValues.length;

  var rowsToMove = [];

  // Find the column index of the interview column
  var columnIndex = sourceValues[0].indexOf(interviewColumnName);

  // Start from the edited row
  for (var i = editedRow - 1; i < numRows; i++) {
    var interviewValue = sourceValues[i][columnIndex];
    if (interviewValue.toLowerCase() === "yes") {
      rowsToMove.push(sourceValues[i]);
    }
  }

  moveRowsToTargetSheet(rowsToMove, jobApplicationsSheet, interviewsSheet, editedRow);
}

function moveRowsToInactiveApplications(sourceSheet, targetSheet, editedRow) {
  var ghostedColumnName = "Ghosted";
  var rejectedColumnName = "Rejected";
  var sourceRange = sourceSheet.getDataRange();
  var sourceValues = sourceRange.getValues();
  var numRows = sourceValues.length;

  var rowsToMove = [];

  // Find the column indices of the ghosted and rejected columns
  var ghostedColumnIndex = sourceValues[0].indexOf(ghostedColumnName);
  var rejectedColumnIndex = sourceValues[0].indexOf(rejectedColumnName);

  // Start from the edited row
  for (var i = editedRow - 1; i < numRows; i++) {
    var ghostedValue = sourceValues[i][ghostedColumnIndex];
    var rejectedValue = sourceValues[i][rejectedColumnIndex];

    if (ghostedValue.toLowerCase() === "yes" || rejectedValue.toLowerCase() === "yes") {
      rowsToMove.push(sourceValues[i]);
    }
  }

  moveRowsToTargetSheet(rowsToMove, sourceSheet, targetSheet, editedRow);
}

function moveRowsToTargetSheet(rowsToMove, sourceSheet, targetSheet, editedRow) {
  var numRowsToMove = rowsToMove.length;
  if (numRowsToMove > 0) {
    var targetRange = targetSheet.getRange(targetSheet.getLastRow() + 1, 1, numRowsToMove, rowsToMove[0].length);
    targetRange.setValues(rowsToMove);
    
    // Delete the rows from the source sheet (excluding header row)
    sourceSheet.deleteRows(editedRow, numRowsToMove);
  }
}