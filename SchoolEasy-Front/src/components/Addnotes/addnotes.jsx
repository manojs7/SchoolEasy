import { useState } from "react";
import React from "react";
import "./addnotes.css";
import axios from "axios";

const initialValue = {
  std: "",
  subject: "",
  myFile: "",
  comment: "",
};
const Addnotes = () => {
  const [user, setUser] = useState(initialValue);
  const [success, setSuccess] = useState();

  const onValueChange = (e) => {
    if (e.target.name === "myFile") {
      setUser({ ...user, [e.target.name]: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const addNotes = async (e) => {
    e.preventDefault();

    const { std, subject, myFile, comment } = user;
    console.log(user);
    if (std && subject && myFile && comment) {
      await axios
        .post("http://localhost:8080/addnotes", user, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res));
      setSuccess("Notes added successfully");
      // window.location.href = "/allnotes";
    } else {
      alert("invalid input");
    }
  };

  return (
    <main className="container" style={{ marginLeft: "15.5rem" }}>
      {/* className={classes.addnotes} */}
      <form
        className="addnotes"
        enctype="multipart/form-data"
        style={{ padding: "38px" }}
      >
        {success}
        <h3 className="notesheading"> Add Notes</h3>

        <select onChange={(e) => onValueChange(e)} name="std">
          <option value="">Choose Class</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 11">Class 11</option>
          <option value="Class 12">Class 12</option>
        </select>

        <select onChange={(e) => onValueChange(e)} name="subject">
          <option value="">Choose Subject</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
        </select>

        <input
          type="file"
          onChange={(e) => onValueChange(e)}
          name="myFile"
          id="myFile"
        />

        <textarea
          type="textarea"
          rows="4"
          cols="40"
          name="comment"
          placeholder="Enter your comment"
          onChange={(e) => onValueChange(e)}
        ></textarea>

        <button className="notesadd" onClick={addNotes}>
          Add Notes
        </button>
      </form>
    </main>
  );
};
export default Addnotes;
