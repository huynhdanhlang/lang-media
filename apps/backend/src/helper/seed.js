const mapTimeDataDto = (data) => {
  return data.map((dt) => ({
    ...dt,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

const pathDependPlatform = (filename) => {
  return typeof window !== 'undefined' && window.navigator.userAgent.indexOf('Linux')
    ? `/../${filename}`
    : `\\..\\${filename}`;
};

module.exports = { mapTimeDataDto, pathDependPlatform };
