const yaml = require('js-yaml');

/**
 * Create Token Controler - Creates a API token for the user to use with sharex or other tools.
 */
exports.postConfig = async (req, res, next) => {
  try {
    const { supportedUploader, sharexType } = req.body;
    let { token } = req.body;

    const tokenArray = token.split(' ');
    if (tokenArray.length === 1) {
      token = tokenArray.toString();
    } else {
      token = tokenArray.slice(1).toString();
    }
    const fullToken = `Bearer ${token}`;
    switch (supportedUploader) {
      case 'sharex':
        res.set(
          'Content-Disposition',
          `attachment; filename=${process.env.TITLE} ShareX Config.sxcu`
        );
        res.type('json');
        res.send(
          JSON.stringify({
            Version: '12.4.1',
            Name: `${process.env.TITLE} Custom Uploader`,
            DestinationType: sharexType.toString(),
            RequestMethod: 'POST',
            RequestURL: `${process.env.FULL_DOMAIN}/api/v1/upload/`,
            Headers: {
              Authorization: fullToken
            },
            Body: 'MultipartFormData',
            FileFormName: 'file',
            URL: '$json:file.url$',
            DeletionURL: '$json:file.delete$'
          })
        );
        break;
      case 'share-cli':
        res.set(
          'Content-Disposition',
          `attachment; filename=${process.env.TITLE} ShareX Config.yml`
        );
        res.type('yaml');
        res.send(
          yaml.safeDump({
            server: { url: process.env.FULL_DOMAIN },
            creds: { apikey: token }
          })
        );
        break;
      default:
        req.flash('error', 'Not a vaild supported uploader.');
        res.redirect('/config');
        break;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
