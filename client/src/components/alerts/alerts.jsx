import {connect} from 'react-redux';

const Alerts = ({alerts}) => {
    return (
        alerts !== null && alerts.length >0 ?
        alerts.map(alert =>(
            <div key={alert.id} className={`alert alert-${alert.alertType}`}> 
                {alert.msg}
            </div>)
        )
        : ''
        
    )
};

const mapStateToProps = state => ({
    alerts : state.alert
})

export default connect(mapStateToProps)(Alerts);