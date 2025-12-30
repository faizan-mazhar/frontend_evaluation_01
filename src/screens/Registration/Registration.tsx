import { useState } from "react";
import './Registration.css'
import { registerUser } from "../../apis";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    lat: "",
    lng: "",
    companyName: "",
    catchPhrase: "",
    bs: ""
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
        geo: {
          lat: formData.lat,
          lng: formData.lng
        }
      },
      phone: formData.phone,
      website: formData.website,
      company: {
        name: formData.companyName,
        catchPhrase: formData.catchPhrase,
        bs: formData.bs
      }
    };
    const res = await registerUser(payload);

    console.log("User Created:", res);
    alert("User registered successfully!");
  };

  return (
    <div className="container">
      <h2 className="heading">User Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Name</label>
        <input name="name" className="input" placeholder="Name" onChange={handleChange} required />
        <label className="label">Username</label>
        <input name="username" className="input" placeholder="Username" onChange={handleChange} required />
        <label className="label">Email</label>
        <input name="email" className="input" placeholder="Email" onChange={handleChange} required />

        <h4 className="subHeading">Address</h4>
        <div className="addressGrid">
          <input name="street" className="input" placeholder="Street" onChange={handleChange} />
          <input name="suite" className="input" placeholder="Suite" onChange={handleChange} />
          <input name="city" className="input" placeholder="City" onChange={handleChange} />
          <input name="zipcode" className="input" placeholder="Zipcode" onChange={handleChange} />
          <input name="lat" className="input" placeholder="Latitude" onChange={handleChange} />
          <input name="lng" className="input" placeholder="Longitude" onChange={handleChange} />
        </div>

        <label className="label">Phone</label>
        <input name="phone" className="input" placeholder="Phone" onChange={handleChange} />
        <label className="label">Website</label>
        <input name="website" className="input" placeholder="Website" onChange={handleChange} />

        <h4 className="subHeading">Company</h4>
        <input name="companyName" className="input" placeholder="Company Name" onChange={handleChange} />
        <input name="catchPhrase" className="input" placeholder="Catch Phrase" onChange={handleChange} />
        <input name="bs" className="input" placeholder="Business Strategy" onChange={handleChange} />

        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
};

export default Registration;
