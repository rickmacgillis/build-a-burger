import React, {Component} from "react";
import {connect} from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {

  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerOpenedHandler = () => {
    this.setState({ showSideDrawer: true });
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar sideDrawerOpener={ this.sideDrawerOpenedHandler } isAuth={this.props.isAuthenticated} />
        <SideDrawer
          open={ this.state.showSideDrawer }
          closed={ this.sideDrawerClosedHandler }
          isAuth={this.props.isAuthenticated}
        />
        <main className={ classes.Content }>
            { this.props.children }
        </main>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
