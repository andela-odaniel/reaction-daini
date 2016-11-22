import React, { Component, PropTypes } from "react";
import { Panel, Button } from "react-bootstrap";
import { FieldGroup } from "/imports/plugins/core/ui/client/components";
import { Meteor } from "meteor/meteor";
import { SmsSetting } from '/lib/collections';
import Alert from "sweetalert2";
import { Reaction, i18next } from "/client/api";


class SmsSettings extends Component {
    constructor(props) {
      super(props);
        this.state = {
            settings:props.settings,
            isSaving:false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    };

    handleStateChange(e) {
      const { settings } = this.state;
      settings[e.target.name] = e.target.value;
      this.setState({ settings });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const { saveSettings } = this.props;
        const { settings } = this.state;
        this.setState({ isSaving: true });
        saveSettings(settings, () => this.setState({ isSaving: false }));
    }

    render() {
        const { providers } = this.props;
        const { settings, isSaving } = this.state;

        return (<Panel header={<h3>Sms Notification Settings</h3>}>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            label="Sms Provider"
            componentClass="select"
            name="smsProvider"
            onChange={this.handleStateChange}>
            <option value="jusibe" data-i18n="mail.settings.selectService">Select an SMS API provider...</option>
            <option value="twilio">Twilio</option>
            <option value="jusibe">Jusibe</option>
          </FieldGroup>
          <hr/>
          <FieldGroup
            label="App Id"
            type="text"
            name="appId"
            value={settings.appId}
            onChange={this.handleStateChange}/>
          <FieldGroup
            label="App Token"
            type="text"
            name="appToken"
            value={settings.appToken}
            onChange={this.handleStateChange}/>
            <FieldGroup
            label="Phone Number"
            type="text"
            name="phone"
            value={settings.phone}
            onChange={this.handleStateChange}/>
          <Button bsStyle="primary" className="pull-right" type="submit" disabled={isSaving}>
            {isSaving ?
                <i className="fa fa-refresh fa-spin"/>
              : <span data-i18n="app.save">Save</span>}
          </Button>
        </form>
      </Panel>);
    }
};


SmsSettings.propTypes = {
  saveSettings: PropTypes.func,
  settings: PropTypes.object
};

export default SmsSettings;