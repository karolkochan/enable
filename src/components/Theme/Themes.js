import green from 'material-ui/colors/green';
import {createMuiTheme} from 'material-ui/styles';

export const silvairColors = {
  50: '#e3faf2',
  100: '#b9f4de',
  200: '#8aecc8',
  300: '#5be4b2',
  400: '#37dfa2',
  500: '#14d991',
  600: '#12d589',
  700: '#0ecf7e',
  800: '#0bca74',
  900: '#06c062',
  A100: '#eafff3',
  A200: '#b7ffd7',
  A400: '#84ffba',
  A700: '#6affac',
  contrastDefaultColor: 'dark'
};

// export const platformColors = {
//   50: '#eaedfe',
//   100: '#cbd3fe',
//   200: '#a9b6fd',
//   300: '#8799fc',
//   400: '#6d83fb',
//   500: '#536dfa',
//   600: '#4c65f9',
//   700: '#425af9',
//   800: '#3950f8',
//   900: '#293ef6',
//   A100: '#ffffff',
//   A200: '#ffffff',
//   A400: '#ced2ff',
//   A700: '#536dfa',
//   contrastDefaultColor: 'light'
// };
export const platformColors = {
  50: '#e0eaff',
  100: '#b3cbff',
  200: '#80a8ff',
  300: '#4d85ff',
  400: '#266bff',
  500: '#0051ff',
  600: '#004aff',
  700: '#0040ff',
  800: '#0037ff',
  900: '#0027ff',
  A100: '#ffffff',
  A200: '#f2f3ff',
  A400: '#bfc5ff',
  A700: '#a6aeff',
  contrastDefaultColor: 'light'
};

export const blackColors = {
  50: '#e4e4e4',
  100: '#bbbbbc',
  200: '#8e8e8f',
  300: '#606062',
  400: '#3e3e40',
  500: '#1c1c1e',
  600: '#19191a',
  700: '#141416',
  800: '#111112',
  900: '#09090a',
  A100: '#5be4b2',
  A200: '#37dfa2',
  A400: '#14d991',
  A700: '#06c062',
  contrastDefaultColor: 'light'
};

const darkPalette = {
  type: 'light',
  primary: platformColors,
  secondary: green
};

export const darkTheme = createMuiTheme({
  palette: Object.assign({}, darkPalette, {
    // background: {
    //   default: '#dfdfe1',
    //   paper: '#ffffff',
    //   appBar: '#1c1c1e',
    //   contentFrame: '#dfdfe1'
    // }
  }),
  overrides: {
    MuiIconButton: {
      colorContrast: {
        color: silvairColors['500']
      }
    }
  }
});
