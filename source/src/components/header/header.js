import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, subTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <span>{ subTitle }</span>
    </div>
    <Link to="/about/">About</Link>
    <Link to="/blogs/">Blog</Link>
    <Link to="/projects/">Projects</Link>
    <Link to="/lab/">Lab</Link>
    <Link to="https://drive.google.com/open?id=1-SkcMGMlewHEtHm7hAKTvUkYFrbmItfr">Resume</Link>
    <Link to="mailto:miteshmap@gmail.com">Contact</Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
