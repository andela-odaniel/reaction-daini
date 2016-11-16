import React, { Component, PropTypes } from "react";
import './notificationDropdownCss.css';
import './notify.css';
import moment from 'moment';
class NotificationDropdown extends Component {
    constructor(props) {
        super(props);

        this.checkNotifications = this.checkNotifications.bind(this);
    }

    checkNotifications() {
        console.log(this.props.notificationList);
        if(this.props.notificationList.length < 0) {
            return (<li className="notification">
                        <div className="media">
                            <div className="media-body">
                                <strong className="notification-title">No notifications yet</strong>
                            </div>
                        </div>
                    </li>
                    );
        }
    };

    render() {
        const { notificationList, badge, markAllAsRead, markOneAsRead} = this.props;
        return (
            <div className="notify-bar">
                <div className="dropdown-toolbar">
                    <div className="dropdown-toolbar-actions">
                        <a onClick={markAllAsRead}> Mark all as read</a>
                    </div>
                    <h3 className="dropdown-toolbar-title">Recent ({badge})</h3>
                </div>
                <ul className="dropdown-notify notifications">
                {this.checkNotifications}
                {notificationList.map((notify)=> {
                    let classes = 'notification ' + notify.statusRead;
                    if(notify.sentAt == "") {
                        var timeNow = '';
                    }else {
                        var timeNow = moment(notify.sentAt).fromNow();
                    }
                    
                    return (<li className={classes}>
                        <a href={notify.urlLink} onClick={() => {
                            markOneAsRead(notify._id) 
                        }}>
                        <div className="media">
                            <div className="media-body">
                                <strong className='notification-title'>{notify.message}</strong>

                                <div className="notification-meta">
                                    <small className="timestamp">{timeNow}</small>
                                 </div>
                            </div>
                        </div>
                        </a>
                    </li> 
                    );
                })}
                </ul>
                <div className="dropdown-footer text-center">
                    <a href="#">View All</a>
                </div>
            </div>
        );
    };
}

NotificationDropdown.propTypes = {
    notificationList : PropTypes.array,
    markAllAsRead: PropTypes.func,
    markOneAsRead:PropTypes.func,
    badge: PropTypes.string
};

export default NotificationDropdown;