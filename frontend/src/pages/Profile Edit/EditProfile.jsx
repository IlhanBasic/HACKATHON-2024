import React, { useState, useContext, useEffect } from "react";
import "./EditProfile.css";
import Header from "../../components/Header/Header";
import API_URL from "../../API_URL";
import AuthContext from "../../context/AuthContext";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
function EditProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const nameRegex = /^[A-Za-z]{2,30}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const addressRegex = /^[A-Za-z0-9\s]{5,100}$/;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok) {
          const error = await response.json();
          setError(error.message);
          setIsModalOpen(true);
          return;
        }
        const data = await response.json();
        setProfile({ ...data, firstName: data.name, lastName: data.surname });
      } catch (err) {
        setError(err.message);
        setIsModalOpen(true);
      }
    };
    fetchUserData();
  }, []);
  const validate = () => {
    const errors = {};
    if (!nameRegex.test(profile.firstName)) {
      errors.firstName = "Ime mora imati najmanje 2 slova i najvise 30";
    }
    if (!nameRegex.test(profile.lastName)) {
      errors.lastName = "Prezime mora imati najmanje 2 slova i najvise 30";
    }
    if (!emailRegex.test(profile.email)) {
      errors.email = "Email nije validan";
    }
    if (!phoneRegex.test(profile.phone)) {
      errors.phone = "Broj telefona mora imati 10 cifara";
    }
    if (!addressRegex.test(profile.address)) {
      errors.address = "Adresa mora imati najmanje 5 slova i najvise 100";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...profile, name: profile.firstName, surname: profile.lastName}),
      });
      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        setIsModalOpen(true);
        return;
      }
      window.scrollTo(0, 0);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={"Izmeni profil"} />
      <div className="edit-profile">
        <div className="profile-form-container">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Ime</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  required
                />
                {formErrors.firstName && (
                  <div className="error-message">{formErrors.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <label>Prezime</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  required
                />
                {formErrors.lastName && (
                  <div className="error-message">{formErrors.lastName}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                required
              />
              {formErrors.email && (
                <div className="error-message">{formErrors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label>Telefon</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                required
              />
              {formErrors.phone && (
                <div className="error-message">{formErrors.phone}</div>
              )}
            </div>
            <div className="form-group">
              <label>Adresa</label>
              <input
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
                required
              />
              {formErrors.address && (
                <div className="error-message">{formErrors.address}</div>
              )}
            </div>
            {!loading && (
              <button type="submit" className="submit-btn">
                Sačuvaj promene
              </button>
            )}
            {loading && <Loader />}
          </form>
          {error && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              errorMessage={error}
            >
              <h2>Greška</h2>
              <p>Profil nije izmenjen</p>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}

export default EditProfile;