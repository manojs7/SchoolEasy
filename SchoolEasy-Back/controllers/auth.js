const md5 = require("md5");
const User = require("../models/user");
// const Student = require("../models/addstudent_0");
const Student = require("../models/addstudent");
const Otp = require("../models/otp");
const notes = require("../models/addnotes");
const circular = require("../models/addcircular");
const jwt = require("jsonwebtoken");
const config = require("../config/authconfig");
const attendance = require("../models/attendance");

exports.adduser = (req, res, next) => {
  console.log("in add user");
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name, email, password);

    const user = new User({
      name: name,
      email: email,
      password: md5(password),
      role: "Student",
    });
    user.save().then((user) => {
      console.log(user);
    });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
  //   user.save((err, user) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(user);
  //   });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: md5(password) }).then((user) => {
    if (user) {
      const data = {
        id: user._id,
        role: user.role,
      };
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        config.secret,
        { expiresIn: 43200 }
      );
      // sessionStorage.setItem(user._id);
      console.log(token);
      res.status(200).send({
        message: "login success",
        token: token,
        role: user.role,
        data: data,
      });
    }
  });

  Student.findOne({ email: email, password: password }).then((user) => {
    if (user) {
      const data = {
        id: user._id,
        role: "Student",
      };
      const token = jwt.sign(
        {
          id: user._id,
          role: "Student",
        },

        config.secret,
        { expiresIn: 43200 }
      );
      // console.log(token);
      // localStorage.setItem("token", token);
      res
        .status(200)
        .send({ message: "login success", token: token, data: data });
    }
  });
};

exports.addstudent = (req, res, next) => {
  console.log("in add student");
  try {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const password = req.body.password;
    const rollNo = req.body.rollNo;
    const dob = req.body.dob;
    console.log(name, username, email, phone, gender, password, rollNo, dob);

    const user = new Student({
      name: name,
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      password: password,
      rollNo: rollNo,
      dob: dob,
      isActive: true,
    });
    user.save().then((user) => {
      console.log(user);
    });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};
exports.getTotalUsers = async (req, res) => {
  try {
    const c = await Student.countDocuments();
    return res.status(200).send({ count: c });
  } catch (error) {
    res.status(500).send({ message: "Error occured in counting", err: error });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const skip = (req.query.page - 1) * 3;
    const a = await Student.aggregate([
      {
        $lookup: {
          from: "attendances",
          // let: { ID: "$userID" },
          localField: "userID",
          foreignField: "_id",
          // pipeline: [
          //   {
          //     $match: {
          //       $expr: {
          //         $eq: ["$_id", "$$ID"],
          //       },
          //     },
          //   },
          // ],
          as: "attendencedetails",
        },
      },
    ]).then((response) => console.log(response));

    console.log("myresponse", a);

    Student.find()
      .limit(3)
      .skip(skip)
      .then((users) => {
        res
          .status(200)
          .send({ message: "Response sending succesfully", user: users });
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getUser = (req, res) => {
  console.log("in get user", req.params.id);
  try {
    Student.find({ _id: req.params.id }).then((users) => {
      // console.log(users);
      res
        .status(200)
        .send({ message: "Response sending succesfully", user: users });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // res.status(200).send({ message: "ignore" });
};

exports.editUser = async (req, res) => {
  let user = req.body;
  const editUser = new Student(user);
  const { base64 } = req.body;
  try {
    await Student.updateOne({ _id: req.params.id }, editUser);
    Images.create({ image: base64 });
    res.status(201).json(editUser);
    console.log(editUser);
  } catch (error) {
    // console.log("i  m  at error)");
    res.status(409).json({ message: error.message });
  }
};

exports.ActiveInactiveUser = async (req, res) => {
  let user = { isActive: req.body.flag };

  try {
    await Student.updateOne({ _id: req.params.id }, user);
    res.status(201).json(user);
  } catch (error) {
    // console.log("i  m  at error)");
    res.status(409).json({ message: error.message });
  }
};

exports.emailSend = async (req, res) => {
  console.log("here", req.body);
  let data = await Student.findOne({ email: req.body.email });
  console.log(data);
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    // mailer(req.body.email, otpcode);
    let otpResponse = await otpData.save();
    console.log(otpcode, otpResponse);
    responseType.statusText = "success";
    responseType.message = "please check your email id";
  } else {
    responseType.statusText = "error";
    responseType.message = "email id not exist";
  }
  res.status(200).json(responseType);
};

// const mailer = (email, otp) => {
//   var nodemailer = require("nodemailer");
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "anshikag992@gmail.com",
//       pass: "anshika@9760",
//     },
//   });

//   var mailOptions = {
//     from: "anshikag992@gmail.com",
//     to: "takmanoj369@gmail.com",
//     subject: "sending email using NodeJs",
//     text: "Thank Yor!",
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("email send : " + info.response);
//     }
//   });
// };

exports.changePassword = async (req, res) => {
  let data = await Otp.findOne({
    email: req.body.email,
    code: req.body.inputField.otp,
  });
  console.log("hello", req.body.email, req.body.inputField.otp);

  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "token expired";
      response.statusText = "error";
    } else {
      let user = await Student.findOne({ email: req.body.email });
      await Student.updateOne(
        { email: req.body.email },
        { password: req.body.inputField.password }
      );
      // user.password = req.body.password;
      // user.save();
      response.message = "password changes successfully";
      response.statusText = "success";
    }
  } else {
    response.message = "invalid otp";
    response.statusText = "error";
  }
  res.status(200).json(response);
};

exports.otpverify = (req, res) => {
  console.log(req.params.email);
  const OTP = req.body.otp;

  Otp.findOne({ email: req.params.email }).then((doc) => {
    let code = doc.code;

    if (code === OTP) {
      res.status(200).send({ message: "OTP verified successfully" });
    } else {
      res.status(400).send({ message: "Verification failed" });
    }
  });
};

exports.logout = (req, res) => {
  console.log("hello my logout page");
  // sessionStorage.clear();
  res.clearCookie("jwttoken");
  res.status(200).send({ message: "user logged out" });
};

exports.addnotes = (req, res, next) => {
  console.log("in add notes");
  console.log("req", req.file, req.body);
  try {
    const std_class = req.body.std;
    const subject = req.body.subject;
    const filename = req.file.filename;
    const comment = req.body.comment;
    console.log(std_class, subject, filename, comment);

    const notes_data = new notes({
      std: std_class,
      subject: subject,
      filename: filename,
      comment: comment,
    });
    notes_data.save().then((user) => {
      console.log(user);
    });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
  // res.send({ message: "success" });
};

exports.shownotes = (req, res) => {
  const sub = req.params.subject;
  try {
    const skip = (req.query.page - 1) * 4;
    notes
      .find({ subject: sub })
      .limit(4)
      .skip(skip)
      .then((notes) => {
        // console.log(users);
        console.log(notes);
        res
          .status(200)
          .send({ message: "Response sending succesfully", notes: notes });
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // res.status(200).send({ message: "ignore" });
};

exports.showteachernotes = (req, res) => {
  try {
    const skip = (req.query.page - 1) * 3;
    notes
      .find()
      .limit(3)
      .skip(skip)
      .then((notes) => {
        // console.log(users);
        console.log("ntotes", notes);
        res
          .status(200)
          .send({ message: "Response sending succesfully", notes: notes });
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // res.status(200).send({ message: "ignore" });
};

exports.getTotalNotes = async (req, res) => {
  try {
    const c = await notes.countDocuments();
    if (req.params.subject) {
      const c = await notes
        .find({ subject: req.params.subject })
        .countDocuments();
    } else {
      const c = await notes.countDocuments();
    }

    res.status(200).send({ count: c });
  } catch (error) {
    res.status(500).send({ message: "Error occured in counting", err: error });
  }
};

exports.addcircular = (req, res, next) => {
  console.log("in add circular");
  try {
    const title = req.body.title;
    const content = req.body.content;
    const date = req.body.date;

    console.log(title, content, date);

    const circular_data = new circular({
      title: title,
      content: content,
      date: date,
    });
    circular_data.save().then((user) => {
      console.log(user);
    });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

exports.showcircular = (req, res) => {
  try {
    const skip = (req.query.page - 1) * 6;
    circular
      .find()
      .limit(6)
      .skip(skip)
      .then((circular) => {
        console.log("hello", circular);
        res.status(200).send({
          message: "circular sending succesfully",
          circular: circular,
        });
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getTotalCirculars = async (req, res) => {
  try {
    const c = await circular.countDocuments();
    console.log(c);
    res.status(200).send({ count: c });
  } catch (error) {
    res.status(500).send({ message: "Error occured in counting", err: error });
  }
};

// exports.AbsentPresentUser = async (req, res) => {
//   let user = { attendance: req.body.flag };

//   try {
//     if ((await attendance.find({ userID: req.params.id })).length > 0) {
//       await attendance.updateOne({ userID: req.params.id }, user);
//     } else {
//       const user = new attendance({
//         userID: req.params.id,
//         name: "name",
//         attendance: req.body.flag,
//         date: "12-04-2023",
//       });
//       user.save().then((user) => {
//         console.log(user);
//       });
//     }

//     res.status(201).json({ meassge: "attendance marked" });
//   } catch (error) {
//     // console.log("i  m  at error)");
//     res.status(409).json({ message: error.message });
//   }
// };

exports.AbsentPresentUser = async (req, res) => {
  let user = { attendance: req.body.flag };

  try {
    // if (
    //   (await attendance.find({ userID: req.params.id, date: currentDate }))
    //     .length > 0
    // ) {
    //   await attendance.updateOne({ userID: req.params.id }, user);
    // } else {
    const name = req.body.name;
    // date = currentDate;
    // const currentDate = date;
    const user = new attendance({
      userID: req.params.id,
      name: name,
      attendance: req.body.flag,
      // date: currentDate,
    });
    user.save().then((user) => {
      console.log(user);
    });
    // }
    // console.log("vdfffffffffffffffffffffffffffffffffffff", req.body.flag);
    const f = req.body.flag ? "Present" : "Absent";
    res.status(201).json({
      message: "attendance marked",
      stat: req.body.flag,
    });
  } catch (error) {
    // console.log("i  m  at error)");
    res.status(409).json({ message: error.message });
  }
};

exports.AttendanceReport = (req, res) => {
  const skip = (req.query.page - 1) * 3;
  try {
    attendance
      .find()
      .limit(3)
      .skip(skip)
      .then((attendance) => {
        // console.log(users);
        res.status(200).send({
          message: "attendance sending succesfully",
          attendance: attendance,
        });
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // res.status(200).send({ message: "ignore" });
};

exports.getTotalAttendance = async (req, res) => {
  try {
    const c = await attendance.countDocuments();
    res.status(200).send({ count: c });
  } catch (error) {
    res.status(500).send({ message: "Error occured in counting", err: error });
  }
};

exports.getAttendance = (req, res) => {
  console.log("in get attendance", req.params.id);
  try {
    attendance.find({ userID: req.params.id }).then((attendance) => {
      // console.log(users);
      res.status(200).send({
        message: "Attendance sending succesfully",
        attendance: attendance,
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // res.status(200).send({ message: "ignore" });
};
