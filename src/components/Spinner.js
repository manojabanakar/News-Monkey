import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
        <div className="d-flex justify-content-center my-3">
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
  }
}

export default Spinner
