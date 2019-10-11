import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '866770968716-d4hf0d25ud4hqq2ikso6o29c6i1aag79.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }
  }
  onSignInClick = () => {
    this.auth.signIn()
  }
  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderOffButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon'></i>Sign Out
        </button>
      )
    } else {
      return (<button onClick={this.onSignInClick} className='ui red google button'>
        <i className='google icon'></i>Sign In with Google
    </button>)
    }
  }
  render() {
    return <div>
      {this.renderOffButton()}
    </div>
  }
}

const mapStatesToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStatesToProps, { signIn, signOut })(GoogleAuth)