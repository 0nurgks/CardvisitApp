import React, { useEffect, useState } from 'react';

const CardFetch = 'http://your-api-url.com/cards';  // API URL'sini buraya ekleyin

const MyCardsPage = ({link}) => {
  const [myCards, setMyCards] = useState([]);

  const fetchCards = async () => {
    try {
      console.log('Fetching cards...');
      const username = localStorage.getItem('username');  
      console.log('Fetched username from localStorage:', username);

      if (!username) {
        console.error('Kullanıcı adı bulunamadı. Lütfen kullanıcı adı kaydedildiğinden emin olun.');
        return;
      }

      const response = await fetch(link, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.myCards) {
        setMyCards(data.myCards);
        console.log('Kartlar başarıyla alındı:', data.myCards);
      } else {
        console.error('Kartlar alınamadı. Response:', data);
      }
    } catch (error) {
      console.error('Fetch sırasında bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div style={styles.container}>
      {myCards.length > 0 ? (
        myCards.map((card, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.text}>Textarea 1: {card.textarea1}</p>
            <p style={styles.text}>Textarea 2: {card.textarea2}</p>
            {card.image && (
              <img
                src={`data:image/png;base64,${card.image}`}
                alt="Card image"
                style={styles.image}
              />
            )}
          </div>
        ))
      ) : (
        <p>No cards available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  image: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
  },
};

export default MyCardsPage;
