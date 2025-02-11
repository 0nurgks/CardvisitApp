const express = require("express");
const ContactModel = require("../modules/ContactModule");
const CardModel = require("../modules/CardModule");
const mongoose = require('mongoose');
const AuthModel = require('../modules/AuthModule');  // Kullanıcı modelini import ediyoruz
const app = express();

// Kullanıcıyı username ile bulup kartlarını ve ilgili contact verilerini getiren API
module.exports.getContact = async (req, res) => {
    const { username } = req.params;  // Query'den username'yi alıyoruz
  
    try {
      // Eğer username gelmemişse, hata mesajı döndürüyoruz
      if (!username) {
        console.error('Username parametresi eksik!');  // Debug: username parametresinin eksik olduğu durumda log
        return res.status(400).json({ message: 'Username parametresi gerekli.' });
      }
  
      // Kullanıcıyı username ile buluyoruz
      console.log('Kullanıcıyı bulmaya çalışıyoruz, Username:', username);  // Debug: username kontrolü
      const user = await AuthModel.findOne({ username: username });
      
      // Kullanıcı bulunamadıysa hata döndürüyoruz
      if (!user) {
        console.error('Kullanıcı bulunamadı:', username);  // Debug: Kullanıcı bulunamadığında log
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
      console.log('Kullanıcı bulundu:', user);  // Debug: Kullanıcı verilerini logluyoruz
  
      // Kullanıcının userid'sini alıyoruz
      const userId = user._id;
      console.log("Kullanıcı ID'si:", userId);  // Debug: Kullanıcı ID'sini kontrol et
  
      // Kullanıcının kartlarını alıyoruz
      console.log('Kullanıcının kartlarını almak için sorgu yapıyoruz, UserID:', userId);  // Debug: Kart sorgusunun başlangıcı
      const cards = await CardModel.find({ userid: userId });
  
      // Kartlar boşsa, hata mesajı döndürüyoruz
      if (cards.length === 0) {
        console.error('Kullanıcının kartları bulunamadı, UserID:', userId);  // Debug: Kartlar bulunamadığında log
        return res.status(404).json({ message: 'Kullanıcının kartları bulunamadı' });
      }
      console.log("Kullanıcının kartları:", cards);  // Debug: Kart verilerini kontrol et
  
      // Kartlara ait contact verilerini almak için promises oluşturuyoruz
      console.log('Kartlara ait contact verilerini almak için promises oluşturuluyor');  // Debug: Contact verileri için promises hazırlığı
      const contactsPromises = cards.map(card => 
        ContactModel.find({ card: card._id })  // Kartın ID'sine göre contactları getiriyoruz
      );
  
      // Tüm contact verilerini eşzamanlı olarak alıyoruz
      console.log('Contact verilerini almak için eşzamanlı sorgular başlatılıyor...');  // Debug: Tüm contactları almak için sorgular başlatılacak
      const contacts = await Promise.all(contactsPromises);
  
      // Contact verilerini kontrol et
      console.log("Contact'lar:", contacts);  // Debug: Alınan contact verilerini kontrol et
  
      // Kartlar ve contactları birleştiriyoruz
      const result = cards.flatMap((card, index) => contacts[index] || []);  // Boş contact varsa, boş bir array döndürür

  
      // Sonuçları başarıyla gönderiyoruz
      console.log('Sonuçlar başarıyla oluşturuldu, gönderiliyor...');  // Debug: Sonuçların başarıyla gönderilmesi
      res.status(200).json(result);
  
    } catch (error) {
      // Eğer bir hata oluşursa, hatayı konsola yazdırıyoruz
      console.error('Hata oluştu:', error);  // Debug: Hata durumunda tüm hata bilgilerini logluyoruz
      res.status(500).json({ message: 'Veriler alınırken hata oluştu.' });
    }
  };
  




  // POST /contacts/:cardId
  module.exports.postContact = async (req, res) => {
    const { cardId, email, textArea } = req.body;  // body'den cardId, email ve textArea'yı alıyoruz
  
    // 1. Eksik veri kontrolü
    if (!cardId || !email || !textArea) {
      return res.status(400).json({ message: "Eksik veri gönderildi." });
    }
  
    try {
      // 2. Yeni Contact nesnesini oluştur
      const newContact = new ContactModule({
        card: cardId,  // cardId'yi veritabanına kaydediyoruz
        ClientMail: email,
        ClientText: textArea,
      });
  
      // 3. Veriyi veritabanına kaydetme
      await newContact.save();
  
      res.status(200).json({ message: "Mesaj başarıyla gönderildi!" });
    } catch (error) {
      // 4. Hata durumunda
      res.status(500).json({ message: "Bir hata oluştu, lütfen tekrar deneyin." });
    }
  };
  