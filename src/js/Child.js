import React from 'react';

export default class Child extends React.Component{
  render() {
    return (
      <div>
        and this is <b>{this.props.name}</b>.
      </div>)
  }
}