import styled from '@emotion/styled';

// h1
export const StepQuestion = styled.p`
  font-size: 27px;
  color: #fff;
  margin-bottom: 30px;
`;

type BlueProps = {
  blue?: boolean;
};

export const StepButton = styled.button<BlueProps>`
  opacity: 0.97;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: ${(props: BlueProps) =>
    props.blue ? 'var(--brand-blue)' : 'var(--white)'};
  font-size: 25px;
  font-weight: 700;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: 1px;
  text-align: center;
  color: ${(props: BlueProps) => (props.blue ? 'var(--white)' : '#2a2d34')};
  flex: 1;
  padding: 20px;
  max-width: 49%;
  max-width: 260px;
  &:hover {
    background: var(--brand-blue);
    color: #fff;
  }
`;

export const SmallStepButton = styled.button<BlueProps>`
  opacity: 0.97;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: ${(props: BlueProps) =>
    props.blue ? 'var(--brand-blue)' : 'var(--white)'};
  font-size: 25px;
  font-weight: 700;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: 1px;
  text-align: center;
  color: ${(props: BlueProps) => (props.blue ? 'var(--white)' : '#2a2d34')};
  flex: 1;
  padding: 20px;
  max-width: 49%;
  max-width: 260px;
  margin-right: 20px;

  &:hover {
    background: var(--brand-blue);
    color: #fff;
  }
`;

export const Step = styled.p`
  font-size: 18px;
  font-weight: 900;
  color: white;
  margin-bottom: 20px;
  color: #292c34;
`;

export const WhyQuestrade = styled.div`
  margin: 20px 0 40px;
  a {
    color: var(--brand-green);
  }
  p a,
  p {
    font-size: 22px;
  }
  ul {
    list-style: disc;
    margin-left: 20px;
    font-size: 18px;
  }
`;
