import React, { useState } from 'react';

const SubscriptionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubscribed(true);
      } else {
        alert(result.error || 'Error subscribing');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Internal Server Error');
    }
  };

  return (
    <div>
      {subscribed ? (
        <p>Thanks for subscribing!</p>
      ) : (
        <div>
          <h1>Email Subscription Form</h1>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="button" onClick={submitForm}>
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionForm;
