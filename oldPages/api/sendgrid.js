import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: "jaewoongkim95@gmail.com",
      from: "jaewoongkim95@gmail.com",
      subject: `Contact us form from website`,
      html: `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>Contact Form Submission</title>
      </head>
      <body>
          <h2>Contact Form Submission</h2>
          <p>Name: ${req.body.name}</p>
          <p>Email: ${req.body.email}</p>
          <p>Message: ${req.body.message}</p>
      </body>
      </html>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
