import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
  <div className="left">
    <div className="logo">
      <img src="image/logo.png" />
    </div>
    <div className="search_bar">
      <i className="fa-solid fa-magnifying-glass" />
      <input type="text" placeholder="Search EBook" />
    </div>
  </div>
  <div className="center">
    <i className="fa-solid fa-house" />
    <i className="fa-solid fa-tv" />
    <i className="fa-solid fa-store" />
    <i className="fa-solid fa-users" />
  </div>
  <div className="right">
    <i className="fa-solid fa-list-ul" />
    <i className="fa-brands fa-facebook-messenger" />
    <i className="fa-solid fa-bell" />
    <i className="fa-solid fa-moon" />
    <img src="image/profile.png" />
  </div>
</nav>

      </div>
    )
  }
}
