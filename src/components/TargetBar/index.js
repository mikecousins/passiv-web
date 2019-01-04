import React from 'react';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrl } from '../../actions';
import { postData } from '../../api';
import SymbolSelector from './SymbolSelector';

export class TargetBar extends React.Component {
  state = {
    newSymbol: ''
  }

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
    } = this.props;

    const {
      id,
      excluded,
      fullSymbol,
      actualPercentage,
      percent
    } = target;

    let deltaClassName = "w-1/3 text-blue";
    let progressClassName = "bg-blue text-xs leading-none py-1 text-center text-white";
    if ((actualPercentage - percent) < 0) {
      deltaClassName = "w-1/3 text-red";
      progressClassName = "bg-red text-xs leading-none py-1 text-center text-white";
    }
    return (
      <div className="flex w-full">
        <div className="w-1/6">
          {(!id && !excluded) ? (
            <div className="flex w-full">
              <div className="w-1/6">
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
            <div className="w-1/2">
              <div className="shadow w-full bg-grey-light">
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
            <div className="flex w-1/3">
              <div className="w-1/3">
                {children}%
              </div>
              <div className="w-1/3">
                {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(actualPercentage)}%
              </div>
              <div className={deltaClassName}>
                {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1 }).format(actualPercentage - percent)}%
              </div>
            </div>
          </React.Fragment>
        ) : <FontAwesomeIcon icon={faEyeSlash} />}
      </div>
    );
  }
}

export default TargetBar;
