import React, {useState} from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const CheckoutForm= ({ amount })=>{
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCardComplete, setIsCardComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    
    // Function to toggle the modal's visibility
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const redirectionsPageHome = () => {
      navigate("/");
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };

    const handleCardChange = (event) => {
      setIsCardComplete(event.complete);
  };

    const handleSubmit =async(event)=>{
        event.preventDefault();
        setFormSubmitted(true); // Update formSubmitted state when the form is submitted

        if (!isCardComplete) {
            return; // Stop the submission if card details are not complete
        }

        setIsLoading(true);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if(!error){
            console.log("token ok:", paymentMethod);
            try{
                //const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:5000/stripe/charge",
                {
                    amount: Math.round(amount * 100),
                    id: id,
                });
                if (response.data.success)
                    console.log("payment reussi");
            }
            catch (error){
                console.log("error axios", error);
            }
        }
        else{
            console.log(error.message);
        }
        setIsLoading(false);
    };

    return(
        <form onSubmit={handleSubmit} style={{ minWidth: 400}}>
            <CardElement
            options={{
                hidePostalCode: true
            }}
            onChange={handleCardChange}
            />
            {formSubmitted && !isCardComplete && (
                <p style={{ color: 'red', marginTop: '10px' }}>Le champ de la carte est obligatoire.</p>
            )}
            <button type="submit" onClick={showModal} disabled={!isCardComplete || isLoading} style={{backgroundColor: "#0E4A65"}}>{isLoading ? 'Processing...' : 'Payer'}</button>
            {isModalVisible && (
              <div>
                <div className="modal-overlay"></div>
                <div className="modal-content">
                  <h2>Votre paiement a bien été accepté</h2>
                  <div className="modal-buttons">
                    <button onClick={redirectionsPageHome} className="modal-btn">
                      Revenir à la page d'acceuil
                    </button>
                    <button onClick={closeModal} className="modal-btn">
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            )}
        </form>
    )
}