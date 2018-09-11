import React from 'react';
import Trend from 'react-trend';

class RetirementComparer extends React.Component {
  state = {
    yearlySavings: 25000
  };

  calculateFutureValue(yearlySavings, year, interest = 0.07) {
    return yearlySavings * ((((1 + interest) ** year) - 1) / interest);
  }

  getUltimateData() {
    const data = [0];
    for (let i = 1; i <= 40; i++) {
      data.push(this.calculateFutureValue(this.state.yearlySavings, i));
    }
    return data;
  }

  getPassivData() {
    const data = [0];
    for (let i = 1; i <= 40; i++) {
      data.push(this.calculateFutureValue(this.state.yearlySavings, i) - 60 * i);
    }
    return data;
  }

  getRoboData() {
    const data = [0];
    for (let i = 1; i <= 40; i++) {
      data.push(this.calculateFutureValue(this.state.yearlySavings, i, 0.065) - 60 * i);
    }
    return data;
  }

  getMutualData() {
    const data = [0];
    for (let i = 1; i <= 40; i++) {
      data.push(this.calculateFutureValue(this.state.yearlySavings, i, 0.057) - 60 * i);
    }
    return data;
  }

  render() {
    const ultimate = this.getUltimateData();
    const passiv = this.getPassivData();
    const robo = this.getRoboData();
    const mutual = this.getMutualData();
    return (
      <div>
        <label htmlFor="yearlySavings">Yearly Savings Rate</label>
        <input
          type="text"
          name="yearlySavings"
          id="yearlySavings"
          value={this.state.yearlySavings}
          onChange={(e) => this.setState({ yearlySavings: e.target.value })}
        />
        <div>
          <Trend data={passiv} />
        </div>
        <div>
          Ideal: ${new Intl.NumberFormat().format(ultimate[ultimate.length - 1])}<br />
          Passiv: ${new Intl.NumberFormat().format(passiv[passiv.length -1])}<br />
          Robo: ${new Intl.NumberFormat().format(robo[robo.length - 1])}<br />
          Mutual: ${new Intl.NumberFormat().format(mutual[mutual.length -1])}<br />
        </div>
      </div>
    );
  }
}

export default RetirementComparer;
