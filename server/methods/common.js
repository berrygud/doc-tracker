export default function () {
  Meteor.methods({
    'email.sendMail'(to, subject, text) {
      Email.send({
        from: "dcmancapiz@gmail.com",
        to,
        subject,
        text
      });
    }
  });
}

