import React from 'react';
import { faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrl } from '../../actions';
import { postData } from '../../api';
import SymbolSelector from './SymbolSelector';
import Number from '../Number';
import { Table } from '../../styled/GlobalElements';
import { BarContainer,InputContainer,Symbol,Actual,Delta, Bar } from '../../styled/Target';

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
      <Table>
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
        {!excluded ? (
          <React.Fragment>
              <BarContainer>
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
               <InputContainer>{children}%</InputContainer>
              </BarContainer>
              <Actual>
                <Number value={actualPercentage} percentage />
              </Actual>
              <Delta className={deltaClassName}>
                <Number value={actualPercentage - percent} percentage />
              </Delta>
              {edit && <button type="button" onClick={() => onDelete(id)}><FontAwesomeIcon icon={faTimes} /> </button>}
          </React.Fragment>
        ) : <FontAwesomeIcon icon={faEyeSlash} />}
      </Table>
    );
  }
}

export default TargetBar;
