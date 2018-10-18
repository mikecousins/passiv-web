import React from 'react';
import Trend from 'react-trend';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

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
    const ultimateTrend = this.getUltimateData();
    const passivTrend = this.getPassivData();
    const roboTrend = this.getRoboData();
    const mutualTrend = this.getMutualData();
    const ultimateFinal = ultimateTrend[ultimateTrend.length - 1];
    const passivFinal = passivTrend[passivTrend.length - 1];
    const roboFinal = roboTrend[roboTrend.length -1];
    const mutualFinal = mutualTrend[mutualTrend.length - 1];
    return (
      <div className="flex mb-4">
        <div className="w-1/2 bg-grey-lightest h-64">
          <label htmlFor="yearlySavings">Household Savings Rate (${this.state.yearlySavings}/yr)</label>
          <Slider
            name="yearlySavings"
            id="yearlySavings"
            value={this.state.yearlySavings}
            onChange={(value) => this.setState({ yearlySavings: value })}
            min={1000}
            max={100000}
          />
          <div>
            Ideal: ${new Intl.NumberFormat().format(ultimateFinal)}<br />
            Passiv: ${new Intl.NumberFormat().format(passivFinal)}<br />
            Robo: ${new Intl.NumberFormat().format(roboFinal)} <span className="text-red">(${new Intl.NumberFormat().format(roboFinal - passivFinal)})</span><br />
            Mutual: ${new Intl.NumberFormat().format(mutualFinal)} <span className="text-red">(${new Intl.NumberFormat().format(mutualFinal - passivFinal)})</span><br />
          </div>
        </div>
        <div className="w-1/2 bg-grey-light h-64">
          <Trend data={passivTrend} />
        </div>
      </div>
    );
  }
}

export default RetirementComparer;
