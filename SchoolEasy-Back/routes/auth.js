const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth");
const usercontroller = require("../controllers/user");
const checkAuth = require("../middlewares/check_auth");
const multer = require("multer");
const path = require("path");

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(`${__dirname}/public`));
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
// const upload = multer({ dest: "public/files" });

const upload = multer({
  storage: Storage,
  // fileFilter: multerFilter,
});

router.post("/adduser", authcontroller.adduser);
router.post("/login", authcontroller.login);
router.post("/addstudent", authcontroller.addstudent);
router.get("/AllUsers", authcontroller.getUsers);
router.get("/getTotalUsers", authcontroller.getTotalUsers);
router.get("/showteachernotes", authcontroller.showteachernotes);
router.get("/getTotalNotes", authcontroller.getTotalNotes);
router.get("/showattendance", authcontroller.AttendanceReport);
router.get("/getTotalAttendance", authcontroller.getTotalAttendance);
router.get("/showcircular", authcontroller.showcircular);
router.get("/getTotalCirculars", authcontroller.getTotalCirculars);
router.get("/:id", authcontroller.getUser);
router.put("/:id", authcontroller.editUser);
router.put("/InActive/:id", authcontroller.ActiveInactiveUser);
router.post("/email-send", authcontroller.emailSend);
router.post("/change-password", authcontroller.changePassword);
// router.get("/otp-verify/:email", authcontroller.getOtpverify);
router.get("/otp-verify", authcontroller.otpverify);
router.post("/logout", authcontroller.logout);
router.post("/addnotes", upload.single("myFile"), authcontroller.addnotes);
router.get("/shownotes/:subject", authcontroller.shownotes);

router.post("/addcircular", authcontroller.addcircular);

router.put("/Absent/:id", authcontroller.AbsentPresentUser);

router.get("/attendance/:id", authcontroller.getAttendance);

module.exports = router;
