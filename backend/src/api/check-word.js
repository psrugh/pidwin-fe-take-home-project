const checkWord = async (req, res) => {
  const { guess } = req.query;

  try {
    if (typeof guess !== "string") {
      return res.status(400).json({ success: false, message: "Guess must be a string" });
    }

    if (!guess || guess.length !== 6) {
      return res.status(400).json({ success: false, message: "Invalid word length" });
    }

    const word = "games";
    let guessMap = "";

    for (let i = 0; i < word.length; i++) {
      if (guess[i].toLowerCase() === word[i]) {
        guessMap += "1";
      } else if (word.includes(guess[i].toLowerCase())) {
        guessMap += "0";
      } else {
        guessMap += "x";
      }
    }

    return res.status(200).json({ success: true, result: guessMap });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Error..." });
  }
}

export default checkWord;