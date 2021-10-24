let fileReaderController = {
  FileReader: async (req, res, next) => {
    try {
      let str = req.files.myFile.name;
      let isValidText = str.search(".txt");
      if (isValidText !== -1) {
        let logFile = req.files.myFile.data;
        let readData = logFile.toString("utf-8");
        if (readData) {
          console.log(readData);
          return res.json({ response: readData });
        } else {
          return res.json({ error: "error occur" });
        }
      } else {
        return res.json({ invalid: "only .txt file is allow" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = fileReaderController;
