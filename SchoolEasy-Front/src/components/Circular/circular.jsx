import React, { useState } from "react";
import "./circular.css";
import axios from "axios";

const initialValue = {
  title: "",
  content: "",
  date: "",
};

const Addcircular = () => {
  const [user, setUser] = useState(initialValue);
  const [success, setSuccess] = useState();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addcircular = () => {
    const { title, content, date } = user;
    if (title && content && date) {
      axios
        .post("http://localhost:8080/addcircular", user)
        .then((res) => console.log(res));
      setSuccess("circular added successfully");
      // window.location.href = "/addcircular";
      window.location.href = "/showcircular";
    } else {
      alert("invalid input");
    }
  };

  return (
    <main className="container" style={{ marginLeft: "15.5rem" }}>
      <form
        className="circular"
        enctype="multipart/form-data"
        style={{ padding: "38px" }}
      >
        {success}
        <h3 className="circularheading"> Create Circular Notice</h3>
        <input
          type="text"
          name="title"
          placeholder="Enter your Title"
          onChange={(e) => onValueChange(e)}
        ></input>
        <textarea
          type="textarea"
          name="content"
          placeholder="Enter your Content"
          rows={4}
          cols={40}
          onChange={(e) => onValueChange(e)}
        ></textarea>
        <input
          type="date"
          name="date"
          placeholder="Enter date"
          onChange={(e) => onValueChange(e)}
        ></input>

        <button className="buttonadd" onClick={addcircular}>
          Add Circular
        </button>
      </form>
    </main>
  );
};

export default Addcircular;
