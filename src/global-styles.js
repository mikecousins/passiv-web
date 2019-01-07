import { createGlobalStyle } from 'styled-components';
import medFont from './assets/fonts/cooperfont-medium-webfont.woff';
import medFont2 from './assets/fonts/cooperfont-medium-webfont.woff2';
import semiboldFont from './assets/fonts/cooperfont-semibold-webfont.woff';
import semiboldFont2 from './assets/fonts/cooperfont-semibold-webfont.woff2';

const GlobalStyle = createGlobalStyle`

/* Reset */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}


/* Fonts */
@font-face {
  font-family: 'cooper';
  src: url(${medFont2}) format('woff2'),
    url(${medFont}) format('woff');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'cooper';
  src: url(${semiboldFont2}) format('woff2'),
    url(${semiboldFont}) format('woff');
  font-weight: 600;
  font-style: normal;
}

/* Variables */

:root {

--brand-green: #04A287;
--brand-blue: #003BA2;
--brand-blue-hover: #033EBC;
--brand-grey: #2A2D34;

--black: #22292f;
--grey-darkest: #3d4852;
--grey-darker: #606f7b;
--grey-dark: #8795a1;
--grey: #b8c2cc;
--grey-light: #f2f2f2;
--grey-lighter: #f1f5f8;
--grey-lightest: #f8fafc;
--white: #ffffff;

--sm: 576px;
--md: 768px;
--lg: 992px;
--xl: 1200px;

--box-shadow: 0 2px 20px 0 rgba(119, 119, 119, 0.12);

}

/* Global Structure */

html {
  font-family: cooper;
    box-sizing: border-box;
  background-color: #f8fafc;
}

*, *::before, *::after {
  border-width: 0;
  border-style: solid;
  border-color: #f2f2f2;
}

nav {
  background: #fff;
  display: flex;
  justify-content: space-between;
}

button, [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

aside {

}

aside a {
  color: #fff;
  text-decoration: none;
  padding: 10px 0;
  display: block;
  font-size: 1.125rem;
  padding-left: 2.5rem;
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

`;

export default GlobalStyle;
