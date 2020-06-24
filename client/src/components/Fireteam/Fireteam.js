import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Fireteam.css'

class Fireteam extends Component {

    constructor(props) {
        super(props);
        this.get_platform.bind(this);
        this.get_members.bind(this);
        this.get_join_button.bind(this);
        this.get_power_requirement.bind(this);
    }

    get_join_button = () => {
        if (this.props.authenticated) {
            if (this.props.fireteam.leader.consoleID === this.props.user.consoleID) {
                return <button className="fireteam-join-button lead-fireteam" disabled={true}>FIRETEAM LEADER</button>
            }
            if (this.props.fireteam.current_members.some(member => member.consoleID === this.props.user.consoleID)) {
                return <button className="fireteam-join-button joined-fireteam" disabled={true}>JOINED FIRETEAM</button>
            }
        }
        if (this.props.fireteam.current_members.length === this.props.fireteam.capacity) return ( <button className="fireteam-join-button full-fireteam" disabled={true}>FULL</button> )
        else return ( <button className="fireteam-join-button">JOIN FIRETEAM</button> )
    }

    get_platform = (platform_name) => {
        if (platform_name === "PS4") return ( <i className="fa fa-gamepad gamepad"><span className="ps4 console-logo">PS4</span></i>)
        else if (platform_name === "Xbox") return ( <i className="fa fa-gamepad gamepad"><span className="xbox console-logo">Xbox</span></i>)
        else if (platform_name === "Steam") return ( <i className="fa fa-gamepad gamepad"><span className="steam console-logo">Steam</span></i>)
        else return ( <i className="fa fa-gamepad"></i> )

    }

    get_power_requirement = () => {
        if (this.props.fireteam.power_requirement !== "None") return this.props.fireteam.power_requirement + "+";
        else return "N/A";
    }

    get_members = () => {
        var accumulator = [];
        for (var i = 0; i < this.props.fireteam.current_members.length; i++) {
            if (i === 0) accumulator.push(<li className="fireteam-member"><i className="fa fa-user-circle member-logo"></i>{this.props.fireteam.current_members[i].consoleID} <span className="leader-power">{this.props.fireteam.current_members[i].light_level}</span></li>);
            else accumulator.push(<li className="fireteam-member"><i className="fa fa-user-circle member-logo"></i>{this.props.fireteam.current_members[i].consoleID} <span className="member-power">{this.props.fireteam.current_members[i].light_level}</span></li>);
        }

        return accumulator;
    }

    render() {
        return (
            <div className="fireteam-root">
                <div className="fireteam-info">
                    <div className="fireteam-info-left-column">
                        <div className="info-container">
                            {this.get_join_button()}
                            <div className="fireteam-leader info-tile">
                                <h7><i className="fa fa-user left-col-i"></i>{this.props.fireteam.leader.consoleID} <span className="leader-power">1000</span></h7>
                            </div>
                            <div className="fireteam-platform info-tile">
                                <h7>{this.get_platform(this.props.fireteam.platform)}</h7>
                            </div>
                            <div className="fireteam-power-req info-tile">
                                <h6><i className="fa fa-star left-col-i"></i>Power Requirement: <span className="power-req">{this.get_power_requirement()}</span></h6>
                            </div>
                            <div className="fireteam-capacity info-tile">
                                <h7><i className="fa fa-users left-col-i"></i>{this.props.fireteam.current_members.length} / {this.props.fireteam.capacity} Guardians</h7>
                            </div>
                            <div className="fireteam-time-created info-tile">
                                <h7><i className="fa fa-calendar left-col-i"></i>Time Created</h7>
                            </div>
                        </div>
                    </div>
                    <div className="fireteam-info-right-column">
                        <div className="info-container right-col-info-container">
                            <div className="right-col-fireteam-activity-type">
                                <span>{this.props.fireteam.activity_type}</span>
                            </div>
                            <div className="right-col-fireteam-description">
                                <span>{this.props.fireteam.description}</span>
                            </div>

                            <div className="right-col-fireteam-member-list">
                                <ul className="member-list">
                                    {this.get_members()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated,
    user: state.authReducer.user,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status
});

export default connect(mapStateToProps, { })(Fireteam);
