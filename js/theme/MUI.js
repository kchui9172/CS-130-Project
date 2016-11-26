import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500,cyan700,grey400,grey500,grey300,darkBlack,fullBlack, white} from 'material-ui/styles/colors';

const muiThemes = getMuiTheme({
  palette: {
    textColor: '#283c46',    // dirty-blue-black
    accent1Color: '#3cb371', // green
    accent2Color: '#ACE7EF', // cyan
    primary3Color: grey400,
    primary1Color: 'rgba(101, 86, 177, 0.80)',//;'rgba(133, 110, 198, 0.85 )',//'#856ec6',  // lighter - purple
    primary2Color: '#715ea8', // purple
    accent3Color: grey500,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  },

  appBar: {
  height: 56,
  },

});
