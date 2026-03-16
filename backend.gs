// backend.gs
// Instructions for User:
// 1. Go to https://script.google.com/ and create a new project.
// 2. Clear out the existing code and paste this entire script.
// 3. Optional: Create a Google Sheet, name it "Mountnutra Orders", get its ID (from the URL), and place it in the SHEET_ID variable below.
// 4. Click "Deploy" -> "New deployment".
// 5. Select type "Web app". Give it a description.
// 6. Execute as "Me", and importantly, set "Who has access" to "Anyone".
// 7. Click Deploy, authorize the permissions, and copy the resulting "Web app URL".
// 8. Open your website's `script.js` file and replace the `APPS_SCRIPT_URL` placeholder with your new URL.

// Replace this with your actual Google Sheet ID to store orders data permanently.
// If left blank, it will create a new sheet on the first run.
const SHEET_ID = ''; 
const OWNER_EMAIL = 'support@mountnutra.in'; // Replace with your email to receive order notifications

function doPost(e) {
  try {
    // 1. Parse incoming data
    const requestData = JSON.parse(e.postData.contents);
    const customer = requestData.customer;
    const items = requestData.cart;
    const total = requestData.total;
    const orderId = 'ORD-' + Date.now();
    const date = new Date().toLocaleString();

    // 2. Format Items as string for spreadsheet
    const itemsString = items.map(item => `${item.title} (x${item.quantity}) - ₹${item.price * item.quantity}`).join('\n');

    // 3. Connect to Spreadsheet
    let sheet;
    if (SHEET_ID) {
      sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    } else {
      // Find or create sheet
      const files = DriveApp.getFilesByName('Mountnutra Orders');
      let spreadSheet;
      if (files.hasNext()) {
        spreadSheet = SpreadsheetApp.open(files.next());
      } else {
        spreadSheet = SpreadsheetApp.create('Mountnutra Orders');
        const s = spreadSheet.getActiveSheet();
        s.appendRow(['Order ID', 'Date', 'Name', 'Email', 'Phone', 'Address', 'Items', 'Total Price', 'Status']);
        s.getRange('A1:I1').setFontWeight('bold');
      }
      sheet = spreadSheet.getActiveSheet();
    }

    // 4. Append Data to Sheet
    sheet.appendRow([
      orderId,
      date,
      customer.name,
      customer.email,
      customer.phone,
      customer.address,
      itemsString,
      `₹${total}`,
      'Pending'
    ]);

    // 5. Send Notification Email (Optional)
    let emailBody = `New Order Received!\n\nOrder ID: ${orderId}\nDate: ${date}\n\nCustomer Details:\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nAddress: ${customer.address}\n\nOrder Items:\n${itemsString}\n\nTotal: ₹${total}`;
    
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: `New Mountnutra Order - ${orderId}`,
      body: emailBody
    });

    // 6. Return success response
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Order placed successfully',
      orderId: orderId 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Handle errors
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Support pre-flight request for CORS
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST");
}
