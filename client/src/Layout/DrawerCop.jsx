import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';

import LibraryIcon from '@material-ui/icons/LibraryAdd';
import LocationIcon from '@material-ui/icons/GpsFixed';
import RedeemIcon from '@material-ui/icons/Redeem';
import InputIcon from '@material-ui/icons/Input';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

import history from '../redux/history';
import styled from 'styled-components';
import { styleColor } from '../Styles/styleThem';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  }
}));

function NestedList(props) {
  const { handleDrawerToggle, activeUrl } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const [openProduct, setOpenProduct] = React.useState(false);

  function handleClickProduct() {
    setOpenProduct(!openProduct);
  }

  const [openReceiving, setOpenReceiving] = React.useState(false);

  function handleClickReceiving() {
    setOpenReceiving(!openReceiving);
  }

  function navPush(url) {
    handleDrawerToggle();
    history.push(url);
  }

  const rdStoreFlowList = () => (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          color="primary"
          component="div"
          id="nested-list-subheader"
        >
          Store Flow
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClickReceiving}>
        <ListItemIcon>
          <InputIcon
            color={activeUrl === '/app/receiving' ? 'secondary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemTextEl
          inputcolor={activeUrl === '/app/receiving' ? true : false}
          onClick={() => navPush('/app/receiving')}
          primary="Receiving"
        />
        {openReceiving ? <ExpandLessEl /> : <ExpandMoreEl />}
      </ListItem>
      <CollapseEl in={openReceiving} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => navPush('/app/receiving/put-away')}
          >
            <ListItemIcon>
              <DeviceHubIcon
                color={
                  activeUrl === '/app/receiving/put-away'
                    ? 'secondary'
                    : 'inherit'
                }
              />
            </ListItemIcon>
            <ListItemTextEl
              inputcolor={
                activeUrl === '/app/receiving/put-away' ? true : false
              }
              primary="Put Away"
            />
          </ListItem>
        </List>
      </CollapseEl>
    </List>
  );

  const rdMaintenanceList = () => (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          color="primary"
          component="div"
          id="nested-list-subheader"
        >
          Inventory
        </ListSubheader>
      }
      className={classes.root}
    >
      {/* itemList */}
      {/* <ListItem button onClick={() => navPush('/app/product')}>
        <ListItemIcon>
          <RedeemIcon
            color={activeUrl === '/app/product' ? 'secondary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemTextEl
          inputcolor={activeUrl === '/app/product' ? true : false}
          primary="Product"
        />
      </ListItem> */}
      {/* itemList */}
      {/* new Product  */}
      <ListItem button onClick={handleClickProduct}>
        <ListItemIcon>
          <RedeemIcon
            color={activeUrl === '/app/product' ? 'secondary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemTextEl
          inputcolor={activeUrl === '/app/product' ? true : false}
          onClick={() => navPush('/app/product')}
          primary="Product"
        />
        {openProduct ? <ExpandLessEl /> : <ExpandMoreEl />}
      </ListItem>
      <CollapseEl in={openProduct} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => navPush('/app/product/create')}
          >
            <ListItemIcon>
              <LibraryIcon
                color={
                  activeUrl === '/app/product/create' ? 'secondary' : 'inherit'
                }
              />
            </ListItemIcon>
            <ListItemTextEl
              inputcolor={activeUrl === '/app/product/create' ? true : false}
              primary="Create"
            />
          </ListItem>
        </List>
      </CollapseEl>
      {/* new Product  */}

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <LocationIcon
            color={activeUrl === '/app/location' ? 'secondary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemTextEl
          inputcolor={activeUrl === '/app/location' ? true : false}
          onClick={() => navPush('/app/location')}
          primary="Location"
        />
        {open ? <ExpandLessEl /> : <ExpandMoreEl />}
      </ListItem>
      <CollapseEl in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => navPush('/app/location/create')}
          >
            <ListItemIcon>
              <LibraryIcon
                color={
                  activeUrl === '/app/location/create' ? 'secondary' : 'inherit'
                }
              />
            </ListItemIcon>
            <ListItemTextEl
              inputcolor={activeUrl === '/app/location/create' ? true : false}
              primary="Create"
            />
          </ListItem>
        </List>
      </CollapseEl>
    </List>
  );

  return (
    <>
      <ListItem style={{ height: '90px', background: styleColor.color.black1 }}>
        <img
          alt="logo"
          src="/img/1f087f06-5b76-468d-8d3b-57c236755776_200x200.png"
        />
      </ListItem>
      {rdStoreFlowList()}
      {rdMaintenanceList()}
    </>
  );
}

const mapStateToProps = state => ({
  activeUrl: state.auth.liveUrl
});

export default connect(mapStateToProps)(NestedList);

const ListItemTextEl = styled(ListItemText)`
  color: ${props => (props.inputcolor ? styleColor.secondary.dark : 'white')};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${styleColor.secondary.lite};
  }
`;

const CollapseEl = styled(Collapse)`
  background: ${styleColor.color.black1};
`;

const ExpandLessEl = styled(ExpandLess)`
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${styleColor.error.main};
  }
`;

const ExpandMoreEl = styled(ExpandMore)`
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${styleColor.secondary.lite};
  }
`;
