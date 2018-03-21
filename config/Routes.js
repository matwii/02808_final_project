import React from "react";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation"
import { Ionicons } from '@expo/vector-icons';

import {
    Profile,
    Schedule,
    Visualization,
    AddExercise
} from '../screens'

/**
 * Main navigoator for the bottom navigator used throughout the app
 */
export const MainNavigator = TabNavigator(
    {
        //Name of the screen
        Schedule: {
           screen: StackNavigator({
               scheduleScreen: {
                   //Screen component
                   screen: Schedule,
                   //Options for the screen
                   navigationOptions: {
                       headerTitle: "Schedule",
                   }
               },
               addExerciseScreen: {
                   //Screen component
                   screen: AddExercise,
                   //Options for the screen
                   navigationOptions: {
                       headerTitle: "Add new Exercise",
                   }
               }
           }),
            navigationOptions: {
                //Sets the icon of the tab and the tintcolor when it's activated
                tabBarIcon: ({tintColor}) => <Ionicons name={"ios-calendar-outline"} size={32}
                                                       color={tintColor}/>,
                labelStyle: {
                    fontSize: 16
                },
            },
        },
        //Name of the screen
        Profile: {
            //Screen component
            screen: Profile,
            //Options for the screen
            navigationOptions: {
                //Sets the icon of the tab and the tintcolor when it's activated
                tabBarIcon: ({ tintColor }) => <Ionicons name={"ios-person-outline"} size={32} color={tintColor}/>,
                labelStyle: {
                    fontSize: 16
                }
            }
        },
        //Name of the screen
        Visualization: {
            //Screen component
            screen: Visualization,
            //Options for the screen
            navigationOptions: {
                //Sets the icon of the tab and the tintcolor when it's activated
                tabBarIcon: ({ tintColor }) => <Ionicons name={"ios-pie-outline"} size={32} color={tintColor}/>,
                labelStyle: {
                    fontSize: 16
                }
            }
        }
    },{
        //Position of the tabbar
        tabBarPosition: "bottom",
        //Defines the look of the tabbar, this is the iOs default tabbar
        tabBarComponent: TabBarBottom,
        initialRouteName: 'Profile',
    }
);