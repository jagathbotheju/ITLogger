import React, { useEffect } from 'react';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux'; //connect this component to redux
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No Logs to show...</p>
      ) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

//mapping App level state to local component props
const mapStateToProps = state => ({
  //left log-prop name
  //right log, state.log-root reducer name with all state variables
  log: state.log
});

//mapStateToProps and getLogs now become components props
//you must destruct at to of the component to use it
export default connect(mapStateToProps, { getLogs })(Logs);
