import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs';

/**
 *
 *
 * @export
 * @class RxRender
 * @extends {PureComponent}
 *
 * this component turns observables passed to it into state with the same keys
 * example:
 * timer$ is an interval observable that increments by 1 every second
 * <RxRender timer={timer$}>{({ timer }) => <div>Interval: {timer}s</div>}</RxRender>
 * this will render a div that updates the text inside every second: "Interval: [1,2,3,4,...]s"
 *
 */
export default class RxRender extends PureComponent {
  static propTypes = {
    children: PropTypes.func.required
  };
  state = {};
  subs = [];
  componentDidMount() {
    const observables = this.getObservableProps(this.props);
    this.subs = Object.keys(ob => observables[ob].subscribe(val => this.setState({ [ob]: val })));
  }
  componentWillUnmount() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  getObservableProps = props => {
    const isObservable = {};
    Object.keys(props).forEach(key => {
      if (props[key] instanceof Observable) {
        isObservable[key] = props[key];
      }
    });
    return isObservable;
  };
  getNonObservableProps = props => {
    const nonObservable = {};
    Object.keys(props).forEach(key => {
      if (!props[key] instanceof Observable) {
        nonObservable[key] = props[key];
      }
    });
    return nonObservable;
  };
  render() {
    const { children, ...rest } = this.props;
    const nonObservableProps = this.getNonObservableProps(rest);
    return children({ ...this.state, ...nonObservableProps });
  }
}
