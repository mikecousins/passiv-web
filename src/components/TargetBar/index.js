import React from 'react';
import { faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrl } from '../../actions';
import { postData } from '../../api';
import SymbolSelector from './SymbolSelector';
import Number from '../Number';
import { Table } from '../../styled/GlobalElements';
import { BarsContainer,InputContainer,Symbol,Actual,Target,Bar,BarTarget,BarActual } from '../../styled/Target';

export class TargetBar extends React.Component {
  loadOptions = (substring, callback) => {
    postData(`${baseUrl}/api/v1/symbols`, { substring })
      .then(response => {
        console.log('success', response);
        callback(response);
      })
      .catch(error => {
        console.log('error', error);
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

    let deltaClassName = "";
    let progressClassName = "";
    if ((actualPercentage - percent) < 0) {
      deltaClassName = "";
      progressClassName = "";
    }
    return (
      <div>
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

            {edit && <button type="button" onClick={() => onDelete(id)}><FontAwesomeIcon icon={faTimes} /> </button>}
          </React.Fragment>
        ) : <FontAwesomeIcon icon={faEyeSlash} />}
      </div>
    );
  }
}

export default TargetBar;
