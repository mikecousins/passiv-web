import React from 'react';
import { faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../api';
import SymbolSelector from './SymbolSelector';
import Number from '../Number';
import { BarsContainer,InputContainer,Symbol,TargetRow,Actual,Target,Bar,BarTarget,BarActual,Container,Close } from '../../styled/Target';

export class TargetBar extends React.Component {
  loadOptions = (substring, callback) => {
    postData(`/api/v1/symbols`, { substring })
      .then(response => {
        console.log('success', response.data);
        callback(response.data);
      })
      .catch(error => {
        console.log('error', error.response.data);
      });
  }

  render() {
    const {
      target,
      children,
      setSymbol,
      edit,
      onDelete
    } = this.props;

    const {
      id,
      excluded,
      fullSymbol,
      actualPercentage,
      percent
    } = target;

    let progressClassName = "";
    if ((actualPercentage - percent) < 0) {
      progressClassName = "";
    }
    return (
      <Container>
        {!excluded ? (
          <React.Fragment>
            <BarsContainer>
              <BarTarget>
              {
                percent > 100 ? (
                  <Bar className={progressClassName} style={{ width: '100%', backgroundColor: 'red' }}>
                    Warning: allocation cannot be over 100%
                  </Bar>
                ) :
                percent < 0 ? (
                  <Bar className={progressClassName} style={{ width: '100%', backgroundColor: 'red' }}>
                    Warning: allocation cannot be negative!
                  </Bar>
                ) : (
                  <Bar className={progressClassName} style={{ width: `${percent}%` }}> </Bar>
                )
              }
              </BarTarget>
              <BarActual>
              {
                <Bar className={progressClassName} style={{ width: `${actualPercentage}%` }}> </Bar>
              }
              </BarActual>
            </BarsContainer>

            {edit && <Close type="button" onClick={() => onDelete(id)}><FontAwesomeIcon icon={faTimes} /> </Close>}

          </React.Fragment>
        ) : <FontAwesomeIcon icon={faEyeSlash} />}
        <TargetRow>
          <Symbol>
            {(!id && !excluded) ? (
              <SymbolSelector
                value={fullSymbol}
                onChange={setSymbol}
                loadOptions={this.loadOptions}
                getOptionLabel={(option) => option.symbol}
                getOptionValue={(option) => option.id}
                style={{ width: 120 }}
              />
            ) : fullSymbol.symbol}
          </Symbol>
          <Target>
            <InputContainer>{children}%</InputContainer>
          </Target>
          <Actual>
            <Number value={actualPercentage} />%
          </Actual>
        </TargetRow>
      </Container>
    );
  }
}

export default TargetBar;
