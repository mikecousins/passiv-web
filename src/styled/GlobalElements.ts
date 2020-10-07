import styled from '@emotion/styled';
import { css } from '@emotion/core';

type HProps = {
  color?: string;
  margin?: string;
};

const dynamicStyle = (props: HProps) =>
  css`
    color: ${props.color};
  `;

const dynamicMargin = (props: HProps) =>
  css`
    margin: ${props.margin};
  `;

// h1
export const H1 = styled.h1<HProps>`
  font-size: 42px;
  font-weight: 500;
  line-height: 2.17;
  letter-spacing: -1.5px;
  color: #2a2d34;
  @media (max-width: 900px) {
    line-height: 1.3;
    margin-bottom: 20px;
  }
  ${dynamicStyle};
  ${dynamicMargin};
`;

// h2
export const H2 = styled.h2<HProps>`
  font-size: 30px;
  font-weight: 600;
  text-align: left;
  color: #232225;
  display: block;
  ${dynamicMargin};
`;

// h3
export const H3 = styled.h3<HProps>`
  font-size: 18px;
  font-weight: 900;
  line-height: 1.78;
  color: #232225;
  ${dynamicMargin};
`;

// ul
export const UL = styled.ul<HProps>`
  color: #2a2d34;
  ${dynamicStyle};
  li {
    margin-bottom: 10px;
  }
`;

// ul
export const BulletUL = styled.ul`
  padding-top: 5px;
  margin-left: 20px;
  list-style-type: disc;
  li {
    margin-bottom: 10px;
    line-height: 1.3;
  }
`;

type SpaceAroundProps = {
  spaceAround?: boolean;
};

// table
export const Table = styled.div<SpaceAroundProps>`
  display: block;
  justify-content: inherit;
  @media (min-width: 900px) {
    display: flex;
    justify-content: ${(props: SpaceAroundProps) =>
      props.spaceAround ? 'inherit' : 'space-between'};
  }
`;

// p
export const P = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0 0 12px;
  ${dynamicStyle};
`;

export const Span = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0 0 12px;
  ${dynamicStyle};
`;

// a
export const A = styled.a`
  font-size: 18px;
  text-align: left;
  color: #1250be;
  cursor: pointer;
  opacity: ${(props: any) => (props.disabled ? '.7' : '1')};
`;

// a that looks like button
export const AButton = styled.a`
  background-color: ${(props: any) => (props.disabled ? '#003aa1' : '#003BA2')};
  opacity: ${(props: any) => (props.disabled ? '.7' : '1')};
  :hover,
  :visited,
  :link,
  :active {
    text-decoration: none;
  }
  border: none;
  color: white;
  padding: 13px 18px 15px;
  margin: 5px;
  border-radius: 4px;
`;

// edit
export const Edit = styled.button`
  color: var(--brand-blue);
  margin-left: 10px;
  opacity: ${(props) => (props.disabled ? '.7' : '1')};
  svg {
    padding-right: 3px;
  }
`;

//title

//subsetting
export const SubSetting = styled.div`
  margin-top: 14px;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const WarningBox = styled.div`
  background: #fceeb5;
  border-radius: 4px;
  padding: 10px 20px 10px;
  margin: 10px 0 10px 0;
  p {
    margin: 0;
  }
`;

export const DisabledBox = styled.div`
  opacity: 0.7;
  font-size: 0.9em;
  padding: 5px 0px 10px;
  line-height: 1.3em;
`;

export const ErrorMessage = styled.div`
  width: 100%;
  text-align: left;
  margin: 20px 0;
`;

export const OptionsTitle = styled.span`
  font-weight: 600;
  margin-right: 10px;
`;

export const OverlayContainer = styled.div`
  position: relative;
`;

export const TruncatedText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BorderContainer = styled.div`
  padding-top: 15px;
  margin-top: 6px;
  padding-bottom: 5px;
  font-size: 18px;
  border-top: 1px solid #e8e8e8;
`;

export const ErrorBox = styled.div`
  color: red;
  font-size: 0.8rem;
  margin: 1rem 1rem;
`;
