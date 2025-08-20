import { useContext } from "react";
import { BackendContext } from "../context/UserSyncHandler.jsx";

function UserForm() {
  const { handleFeedbackSubmit, formData, setFormData } =
    useContext(BackendContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="feedback-form">
      <h1>Let us know what you'd like to see from this site in the future</h1>
      <form className="feedback" id="feedback">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Suggestion:
          <br />
          <textarea
            type="textarea"
            name="message"
            rows="5"
            cols="30"
            value={formData.message}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <br />
      </form>
      <button style={{ borderColor: "black" }} onClick={handleFeedbackSubmit}>
        Submit
      </button>

      <h2>Preview</h2>
      <section className="preview">
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Feedback: {formData.message}</p>
        <p>Feedback Character Count: {formData.message.length}</p>
      </section>
    </div>
  );
}

export default UserForm;
