const express = require("express");
const router = express.Router();
const { postCard, getCards, deleteCard, getOneCard } = require("../controllers/cardController");

router.post("/", postCard);
router.get("/", getCards);
router.get("/one", getOneCard);  

router.delete("/:cardId", deleteCard);

module.exports = router;
