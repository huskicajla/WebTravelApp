/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import ModalComponent from "./ModalComponent";
import PropTypes from 'prop-types';

function Cards({ item }) {
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const openModal = () => {
    document.getElementById('form_modal').showModal();
  };

  const closeModal = () => {
    document.getElementById('form_modal').close();
  };

  const handleBookingClick = () => {
    if (authUser) {
      openModal();
    } else {
      navigate("/login");
    }
  };

  const handleDestinationClick = () => {
    localStorage.setItem('destinationData', JSON.stringify(item));
    navigate(`/destination/${item._id}`);
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img 
              src={item.image}
              alt="Photo"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              <button 
                onClick={handleDestinationClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {item.name}
              </button>
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.details}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div> 
              <div>
                <div
                  className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                  onClick={handleBookingClick}
                >
                  Book Now
                </div>
                <ModalComponent closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Cards.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    details: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Cards;