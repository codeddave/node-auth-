const getPrivateData = (req, res, next) => {
  res.status(200).json({ data: "You have access to the data in this route " });
};

exports.getPrivateData = getPrivateData;
