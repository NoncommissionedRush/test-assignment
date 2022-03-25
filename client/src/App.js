import React, { Fragment, useState } from "react";
import axios from "axios";

function App(props) {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  async function handleClick() {
    try {
      const response = await axios.post("/");
      setMessage(response.data.message);
      setShowMessage(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <h1>Click to register request</h1>
      {showMessage && <p>{message}</p>}
      <button onClick={handleClick}>Click here</button>
    </Fragment>
  );
}

export default App;
