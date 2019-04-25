import React from 'react';
import { faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../api';
import { connect } from 'react-redux';
import SymbolSelector from './SymbolSelector';
import Number from '../Number';
import {
  BarsContainer,
  InputContainer,
  Symbol,
  TargetRow,
  Actual,
  Target,
  Bar,
  BarTarget,
  BarActual,
  Container,
  Close,
} from '../../styled/Target';
import { loadGroup } from '../../actions';
import { selectCurrentGroupId } from '../../selectors';

export class TargetBar extends React.Component {
  loadOptions = (substring, callback) => {
    postData(`/api/v1/symbols`, { substring })
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        this.props.refreshGroup({ ids: [this.props.groupId] });
        console.log('error', error.response.data);
      });
  };

  render() {
    const { target, children, setSymbol, edit, onDelete } = this.props;

    const { id, key, excluded, fullSymbol, actualPercentage, percent } = target;

    let renderActualPercentage = null;
    if (actualPercentage === undefined) {
      renderActualPercentage = 0;
    } else {
      renderActualPercentage = actualPercentage;
    }

    return (
      <Container>
        {!excluded ? (
          <React.Fragment>
            <BarsContainer>
              <BarActual>
                {percent > 100 ? (
                  <Bar style={{ width: '100%', backgroundColor: 'red' }}>
                    Warning: allocation cannot be over 100%
                  </Bar>
                ) : percent < 0 ? (
                  <Bar style={{ width: '100%', backgroundColor: 'red' }}>
                    Warning: allocation cannot be negative!
                  </Bar>
                ) : (
                  <Bar style={{ width: `${renderActualPercentage}%` }}> </Bar>
                )}
              </BarActual>
              {!(actualPercentage === undefined) && (
                <BarTarget>
                  <Bar style={{ width: `${percent}%` }}> </Bar>
                </BarTarget>
              )}
            </BarsContainer>

            {edit && (
              <Close type="button" onClick={() => onDelete(key)}>
                <FontAwesomeIcon icon={faTimes} />{' '}
              </Close>
            )}
          </React.Fragment>
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        )}
        <TargetRow>
          <Symbol>
            {!(typeof id == 'string') && !excluded ? (
              <SymbolSelector
                value={fullSymbol}
                onChange={setSymbol}
                loadOptions={this.loadOptions}
                getOptionLabel={option =>
                  `${option.symbol} (${option.description})`
                }
                getOptionValue={option => option.id}
                placeholder="Search for security..."
              />
            ) : (
              fullSymbol.symbol
            )}
          </Symbol>
          <Target>
            <InputContainer>{children}%</InputContainer>
          </Target>
          <Actual>
            <Number
              value={renderActualPercentage}
              percentage
              decimalPlaces={1}
            />
          </Actual>
        </TargetRow>
      </Container>
    );
  }
}

const actions = {
  refreshGroup: loadGroup,
};

const select = state => ({
  groupId: selectCurrentGroupId(state),
});

export default connect(
  select,
  actions,
)(TargetBar);
