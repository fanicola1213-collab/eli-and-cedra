/**
 * Wedding RSVP collector: saves each RSVP from the website as a row in this Google Sheet.
 *
 * Setup (one time, about 5 minutes):
 * 1. Signed in to eliandcedra2027@gmail.com, create a new Google Sheet (e.g. "Eli & Cedra RSVPs").
 * 2. Extensions > Apps Script. Delete the sample code and paste this whole file. Save.
 * 3. Deploy > New deployment > type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy, approve the permissions, and copy the Web app URL.
 * 4. Paste that URL into rsvpEndpoint in the CONFIG block of index.html.
 */

// Each new RSVP also sends a short alert to this address. Set to '' to turn alerts off.
const NOTIFY_EMAIL = 'eliandcedra2027@gmail.com';

const HEADERS = ['Timestamp', 'Name', 'Email', 'Attending', 'Party size', 'Guest names',
                 'Meal', 'Dietary', 'Giraffe feeding', 'Song request', 'Note'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    const d = JSON.parse(e.postData.contents || '{}');
    const clean = v => String(v == null ? '' : v).slice(0, 1000).replace(/^[=+\-@]/, "'$&");
    sheet.appendRow([
      new Date(), clean(d.name), clean(d.email), clean(d.attending),
      d.attending === 'yes' ? clean(d.partySize) : '0',
      clean(d.guestNames), clean(d.meal), clean(d.dietary),
      clean(d.giraffe), clean(d.song), clean(d.note)
    ]);
    if (NOTIFY_EMAIL) {
      try {
        const coming = d.attending === 'yes';
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject: 'New RSVP: ' + clean(d.name) + (coming ? ' (attending, ' + clean(d.partySize) + ')' : ' (declined)'),
          body: [
            'Name: ' + clean(d.name), 'Email: ' + clean(d.email),
            'Attending: ' + (coming ? 'Yes' : 'No'),
            coming ? 'Party size: ' + clean(d.partySize) + '\nGuests: ' + clean(d.guestNames) +
                     '\nMeal: ' + clean(d.meal) + '\nDietary: ' + clean(d.dietary) : '',
            d.note ? 'Note: ' + clean(d.note) : '',
            '', 'Full list: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
          ].filter(Boolean).join('\n')
        });
      } catch (err) { /* the RSVP is already saved; an alert failure must not lose it */ }
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
