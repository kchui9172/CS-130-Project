import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500,cyan700,grey400,grey500,grey300,grey200,darkBlack,fullBlack, white} from 'material-ui/styles/colors';

export const purple_light = getMuiTheme({
  palette: {
    textColor: '#283c46',    // dirty-blue-black
    accent1Color: '#3cb371', // green
    accent2Color: grey200,//'#80cbc4', //'#856ec6',//'#ACE7EF', // cyan
    primary3Color: grey400,
    primary1Color: 'rgba(101, 86, 177, 0.80)',//;'rgba(133, 110, 198, 0.85 )',//'#856ec6',  // lighter - purple
    primary2Color: '#715ea8', // purple
    accent3Color: white,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  },
  appBar: {
  height: 56,
  },
  h3:{
    textTransform:'uppercase',
  }
});

export const colors = {
  primary : 'rgba(101, 86, 177, 0.8)',
  primaryHover : 'rgba(151, 86, 177, 1)',
  listHover:'rgba(151, 86, 177, 0.3)',
  red:'rgb(216, 15, 4)',
  message:'#80cbc4',//'rgb(56, 158, 255)',
  chore:'rgb(56, 158, 255)',//'rgb(60, 179, 113)',
  payment:'#607D8B',
  timestamp:'rgba(213, 147, 156, 0.3)',
  timestampOverdue:'rgba(213, 147, 156, 0.7)',
  timestampDone:'rgba(113, 247, 156, 0.3)',
  timestampFuture:'rgba(113, 247, 156, 0.3)',
  profile:'#607D8B',
  profileChipIcon:'rgb(124, 30, 255, 1)',
};
