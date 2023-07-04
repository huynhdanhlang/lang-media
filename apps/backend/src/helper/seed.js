var os = require('os');
const mapTimeDataDto = (data) => {
  return data.map((dt) => ({
    ...dt,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

const pathDependPlatform = (filename) => {
  return os.platform() == 'linux' ? `/../${filename}` : `\\..\\${filename}`;
};

module.exports = { mapTimeDataDto, pathDependPlatform };
