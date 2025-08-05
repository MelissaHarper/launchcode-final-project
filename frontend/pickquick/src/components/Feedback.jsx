import { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name}:`, value);
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
          Feedback:
          <br />
          <textarea
            type="textarea"
            name="feedback"
            rows="5"
            cols="30"
            value={formData.feedback}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <br />

        <input
          style={{ borderColor: "black" }}
          type="submit"
          value="Submit Feedback"
        />
      </form>

      <section>
        <h2>Preview</h2>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Feedback: {formData.feedback}</p>
        <p>Feedback Character Count: {formData.feedback.length}</p>
      </section>
    </div>
  );
}

export default UserForm;
