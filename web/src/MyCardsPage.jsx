import { useState, useEffect } from "react";
import { CardFetch } from "./utils";

const MyCardsPage = ({ cardId }) => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    const fetchCard = async () => {
      if (!cardId) {
        setError("Geçerli bir kart ID bulunamadı.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${CardFetch}?cardId=${cardId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Kart verisi alınamadı.");
        }

        const data = await response.json();
        if (data.card) {
          setCard(data.card);
        } else {
          throw new Error("Kart bulunamadı.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    const generatedLink = `http://localhost:3000/share?cardId=${cardId}`;
    setShareLink(generatedLink);
    setModalVisible(true);
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      {card ? (
        <div style={styles.card}>
          <p style={styles.text}>{card.textarea1}</p>
          <p style={styles.text}>{card.textarea2}</p>
          {/* Eğer image base64 formatında ise: */}
          {card.image || image ? (
 <img
 src={image || card.image}  // 'card.image' zaten base64 formatında
 alt="Card"
 style={styles.image}
/>

) : (
  <p>Resim yok</p>
)}

          <button onClick={handleShare} style={styles.shareButton}>
            Paylaş
          </button>
        </div>
      ) : (
        <p>Kart bulunamadı.</p>
      )}

      {/* Modal */}
      {modalVisible && (
        <div style={styles.modalContainer}>
          <div style={styles.modalContent}>
            <p style={styles.shareText}>Paylaşılabilir Link:</p>
            <p>{shareLink}</p>
            <button onClick={() => setModalVisible(false)} style={styles.closeButton}>
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#eaeaff', 
    height: '100vh',
  },
  card: {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontSize: '18px',
    marginBottom: '12px',
    color: '#333',
    whiteSpace: 'pre-line',
  },
  image: {
    width: '20%',  
    height: 'auto',  
    borderRadius: '8px',
    marginBottom: '20px',
  },
  shareButton: {
    backgroundColor: '#4CAF50', 
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  modalContainer: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    textAlign: 'center',
  },
  shareText: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  closeButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default MyCardsPage;
