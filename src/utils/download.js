import config from '../config/config'
const download = require('download-git-repo')
export const downloadTem = async (projectName) => {
  let api = `${config.registry}/${config.templateName}`;
  return new Promise((resolve, reject) => {
    download(api, projectName, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}