function raiseOrderEmailTemplate(username, link, customer_name, city, items) {
  return ` 
    <!doctype html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <style>
                .main { background-color: white; }
            </style>
        </head>
        <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
                <h1>AGF Sales Tracker New Order</h1>
                <p style="line-height: 1.5;">A new order was raised by ${username}</p>
                <p style="line-height: 1.5;">Customer Name: ${customer_name}</p>
                <p style="line-height: 1.5;">City: ${city}</p>
                <p style="line-height: 1.5;">items ordered: ${items.map(
                  item => `${item.item_ordered}, `
                )}</p>
                <p style="line-height: 1.5;">Login to the dashboard to view details</p>
                <br><br><br>
                <a href=${link} style="text-decoration: none; border-radius: 4px; background-color: #2c8488; color: #fff; text-align: center; border-left: 40px solid #2c8488; border-right: 40px solid #2c8488; border-top: 20px solid #2c8488; border-bottom: 20px solid #2c8488; font-size: 16px; cursor: pointer;">Go to Dashboard</a>
                <br><br><br>
                <br>
            </div>
        </body>
    </html>
  `;
}

module.exports = {
  raiseOrderEmailTemplate
};
