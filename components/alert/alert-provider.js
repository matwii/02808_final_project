import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Platform } from "react-native";
import DropdownAlert from "react-native-dropdownalert";

class AlertProvider extends Component {
    static childContextTypes = {
        alertWithType: PropTypes.func,
        alert: PropTypes.func
    };

    static propTypes = {
        children: PropTypes.any
    };

    getChildContext() {
        return {
            alert: (...args) => this.dropdown.alert(...args),
            alertWithType: (...args) => this.dropdown.alertWithType(...args)
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {React.Children.only(this.props.children)}
                <DropdownAlert
                    ref={ref => {
                        this.dropdown = ref;
                    }}
                    titleStyle={styles.titleStyle}
                    imageStyle={styles.imageStyle}
                    closeInterval={4000}
                />
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 16,
        textAlign: "left",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "transparent",
        marginTop: Platform.OS === "android" ? 24 : 0
    },
    imageStyle: {
        padding: 8,
        width: 36,
        height: 36,
        alignSelf: "center",
        marginTop: Platform.OS === "android" ? 24 : 0
    }
};

export default AlertProvider;