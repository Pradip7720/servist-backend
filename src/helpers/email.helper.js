import nodemailer from 'nodemailer';

export const sendRegistrationMail = (user, password) => {
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      secure: true,
      requireTLS: true,
    });

    const mailOptions = {
      from: 'fintrak.alert@gmail.com',
      to: employee.email,
      subject: 'your account has been created!!',
      html: ` <p> hello </p><strong> ${user.firstName}, </strong> </br>
            <p> you are registered with ems. your password and user name are given below.</p> </br>
            <strong>user name: </strong> <p> ${user.email} </p> </br>
            <strong> password: </strong> <p> ${password} </p> </br>
            <p> this is auto generated password after first log-in please change passwod. </p>`,
    };
    transporter.sendMail(mailOptions);

  } catch (err) {
    console.log(err.message)
  }

};

export const sendForgotPasswordMail = (user, password) => {
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      secure: true,
      requireTLS: true,
    });

    const mailOptions = {
      to: employee.email,
      from: 'fintrak.alert@gmail.com',
      subject: 'your account has been created!!',
      html: ` <p> hello </p><strong> ${user.firstName}, </strong> </br>
            <p> your new password and user name are given below.</p> </br>
            <strong>user name: </strong> <p> ${user.email} </p> </br>
            <strong> password: </strong> <p> ${password} </p> </br>
            <p> this is auto generated password after log-in please change passwod. </p>`,
    };
    transporter.sendMail(mailOptions);

  } catch (err) {
    console.log(err.message)
  }
};
