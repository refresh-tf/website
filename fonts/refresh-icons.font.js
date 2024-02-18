module.exports = {
  'files': [
    '../node_modules/octicons/build/svg/link.svg',
    '../node_modules/octicons/build/svg/link-external.svg',
    '../node_modules/octicons/build/svg/screen-normal.svg',
    '../node_modules/octicons/build/svg/screen-full.svg',
    '../node_modules/simple-icons/icons/github.svg',
    '../node_modules/simple-icons/icons/steam.svg',
    '../node_modules/material-design-icons/file/svg/production/ic_file_download_48px.svg'
  ],
  'fontName': 'refresh-icons',
  'cssTemplate': './refresh-icons.css.hbs',
  'baseSelector': '.rfi',
  'types': ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  'fixedWidth': false,
  'fileName': 'app.[fontname].[chunkhash].[ext]',

  // html doc
  'html': true,
  'htmlTemplate': './refresh-icons.html.hbs',

  // file output
  'dest': './public',
  'writeFiles': true,
};
