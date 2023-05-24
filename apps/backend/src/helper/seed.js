const mapTimeDataDto = (data) => {
  return data.map((dt) => ({
    ...dt,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

module.exports = { mapTimeDataDto };
