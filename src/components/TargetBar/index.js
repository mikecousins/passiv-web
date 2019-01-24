import React from 'react';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrl } from '../../actions';
import { postData } from '../../api';
import SymbolSelector from './SymbolSelector';
import Number from '../Number';

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
        <div>
          {(!id && !excluded) ? (
            <div>
              <div>
                <SymbolSelector
                  value={fullSymbol}
                  onChange={setSymbol}
                  loadOptions={this.loadOptions}
                  getOptionLabel={(option) => option.symbol}
                  getOptionValue={(option) => option.id}
                  style={{ width: 120 }}
                />
              </div>
            </div>
          ) : fullSymbol.symbol}
        </div>
        {!excluded ? (
          <React.Fragment>
            <div>
              <div>
                {
                  percent > 100 ? (
                    <div className={progressClassName} style={{ width: '100%', backgroundColor: 'red' }}>
                      Warning: allocation cannot be over 100%
                    </div>
                  ) :
                    percent < 0 ? (
                      <div className={progressClassName} style={{ width: '100%', backgroundColor: 'red' }}>
                        Warning: allocation cannot be negative!
                      </div>
                    ) : (
                      <div className={progressClassName} style={{ width: `${percent}%` }}>
                        {percent}%
                      </div>
                    )
                }

              </div>
            </div>
            <div>
              <div>
                {children}%
              </div>
              <div>
                <Number value={actualPercentage} />%
              </div>
              <div className={deltaClassName}>
                <Number value={actualPercentage - percent} />%
              </div>
              {edit && <button type="button" onClick={() => onDelete(id)}>X</button>}
            </div>
          </React.Fragment>
        ) : <FontAwesomeIcon icon={faEyeSlash} />}
      </div>
    );
  }
}

export default TargetBar;
