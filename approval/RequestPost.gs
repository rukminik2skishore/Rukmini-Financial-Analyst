// Add this file to the Portfolio Download Requests Apps Script project alongside Code.gs.
function doPost(e) {
  try {
    const p = e.parameter;
    const name = submit(p.project, p.name, p.email);
    const safeName = String(name).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    return HtmlService.createHtmlOutput('<h2>Thank you, ' + safeName + '!</h2><p>Thank you for your interest in my portfolio. I received your request and will email the file once I approve it.</p><p>Rukmini KS</p>').setTitle('Request received');
  } catch (error) {
    return HtmlService.createHtmlOutput('<h2>Request could not be confirmed</h2><p>Return to the portfolio and try again.</p>').setTitle('Request status');
  }
}
