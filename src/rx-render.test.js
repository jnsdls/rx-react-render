import React from 'react';
import { from, BehaviorSubject } from 'rxjs';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';

import RxReactRender from './rx-render';

Enzyme.configure({ adapter: new Adapter() });

describe('<RxReactRender />', () => {
  let wrapper = null;

  //   beforeEach(() => {
  //     const root = document.createElement('div');
  //     wrapper = mount(<RxReactRender />, { attachTo: root });
  //   });

  it('without props it renders the contents', () => {
    wrapper = shallow(<RxReactRender>{() => <div>No Props</div>}</RxReactRender>);
    expect(wrapper).toMatchSnapshot();
  });

  it('with non-observable props it renders with the props passed through', () => {
    wrapper = shallow(
      <RxReactRender notAnObservable="DefinitelyNotAnObservable">
        {({ notAnObservable }) => <div>{notAnObservable}</div>}
      </RxReactRender>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('with observable props it renders with the values passed through', () => {
    const observable = from(['this is just one thing']);
    wrapper = shallow(
      <RxReactRender observable={observable}>
        {({ observable }) => <div>Observable: {observable}</div>}
      </RxReactRender>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('with observable props it renders with the values passed through and updates work', () => {
    const observable = new BehaviorSubject('this is just one thing');
    wrapper = shallow(
      <RxReactRender observable={observable}>
        {({ observable }) => <div>Observable: {observable}</div>}
      </RxReactRender>
    );
    expect(wrapper).toMatchSnapshot();

    observable.next('the next thing');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  it('handles any type of prop', () => {
    const observable = new BehaviorSubject('this is just one thing');
    wrapper = shallow(
      <RxReactRender notObservable={'just a string'} observable={observable}>
        {({ observable, notObservable }) => (
          <div>
            Observable: {observable} - Not An Observable: {notObservable}
          </div>
        )}
      </RxReactRender>
    );
    expect(wrapper).toMatchSnapshot();

    observable.next('the next thing');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
