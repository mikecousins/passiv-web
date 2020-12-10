import React from 'react';
import regFont from '../assets/fonts/cooperfont-book-webfont.woff';
import regFont2 from '../assets/fonts/cooperfont-book-webfont.woff2';
import lightFont from '../assets/fonts/cooperfont-light-webfont.woff';
import lightFont2 from '../assets/fonts/cooperfont-light-webfont.woff2';
import medFont from '../assets/fonts/cooperfont-medium-webfont.woff';
import medFont2 from '../assets/fonts/cooperfont-medium-webfont.woff2';
import semiboldFont from '../assets/fonts/cooperfont-semibold-webfont.woff';
import semiboldFont2 from '../assets/fonts/cooperfont-semibold-webfont.woff2';
import { Global, css } from '@emotion/core';

export const GlobalStyle = () => (
  <Global
    styles={css`
      /* Reset */
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      main,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      main,
      menu,
      nav,
      section {
        display: block;
      }
      /* HTML5 hidden-attribute fix for newer browsers */
      *[hidden] {
        display: none;
      }
      *,
      *:before,
      *:after {
        box-sizing: border-box;
      }
      body {
        line-height: 1;
        overflow-y: scroll;
        letter-spacing: 0.01em;
      }
      ol,
      ul {
        list-style: none;
      }
      blockquote,
      q {
        quotes: none;
      }
      blockquote:before,
      blockquote:after,
      q:before,
      q:after {
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
        font-display: block;
        src: url(${regFont2}) format('woff2'), url(${regFont}) format('woff');
        font-weight: 500;
        font-style: normal;
      }

      @font-face {
        font-family: 'cooper';
        font-display: block;
        src: url(${lightFont2}) format('woff2'),
          url(${lightFont}) format('woff');
        font-weight: 300;
        font-style: normal;
      }

      @font-face {
        font-family: 'cooper';
        font-display: block;
        src: url(${medFont2}) format('woff2'), url(${medFont}) format('woff');
        font-weight: 600;
        font-style: normal;
      }

      @font-face {
        font-family: 'cooper';
        font-display: block;
        src: url(${semiboldFont2}) format('woff2'),
          url(${semiboldFont}) format('woff');
        font-weight: 700;
        font-style: normal;
      }

      /* Variables */

      :root {
        --brand-green: #04a287;
        --brand-blue: #003ba2;
        --brand-blue-hover: #033ebc;
        --brand-grey: #2a2d34;

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

        --box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
      }

      /* Global Structure */

      html {
        font-family: cooper;
        box-sizing: border-box;
        background-color: #f8fafc;
      }

      *,
      *::before,
      *::after {
        border-width: 0;
        border-style: solid;
        border-color: #f2f2f2;
      }

      button,
      [type='button'],
      [type='reset'],
      [type='submit'] {
        -webkit-appearance: none;
        cursor: pointer;
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
        background: none;
      }
      strong {
        font-weight: 700;
      }

      /* remove firefox dotted lines around focused objects */
      a:hover,
      a:active,
      a:focus,
      a:link,
      a:visited {
        outline: 0;
        outline: 0 !important;
        outline-style: none;
      }
      button,
      object,
      embed {
        outline: 0;
      }

      /* All Input elements */
      input::-moz-focus-inner {
        outline: 0;
      }

      /* Or more specifically*/
      input[type='submit']::-moz-focus-inner,
      input[type='button']::-moz-focus-inner {
        outline: 0;
      }

<<<<<<< HEAD
      [data-reach-dialog-content] {
        border-radius: 5px;
        @media (max-width: 500px) {
          margin-top: 150px;
          width: 250px;
        }
      }
      [data-reach-dialog-overlay] {
        z-index: 4;
      }
=======
      [data-reach-dialog-overlay] {
        z-index: 4;
      }
      [data-reach-dialog-content] {
        @media (max-width: 900px) {
          width: 95vw;
        }
      }
>>>>>>> integrations
    `}
  />
);

export default GlobalStyle;
