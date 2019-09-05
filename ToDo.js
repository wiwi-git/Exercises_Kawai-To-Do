import React,{Component} from "react";
import {
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput
} from "react-native";
import PropTypes from "prop-types";

const {width,height} = Dimensions.get("window")
export default class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = { isEditing: false, toDoValue: props.text }
    };
    
    static propTypes = {
        id:PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        uncompleteToDo: PropTypes.func.isRequired,
        completeToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired,
    };

    render(){
        const {isEditing, toDoValue} = this.state
        const {text, id, deleteToDo, isCompleted} = this.props
        return(
            <View style={ styles.container }>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completeCircle:styles.uncompleteCircle]}/>
                    </TouchableOpacity>
                    {isEditing ? (
                    <TextInput 
                    style={[
                        styles.text, 
                        styles.input, 
                        isCompleted ? styles.completeText:styles.uncompleteText
                    ]} 
                    value={toDoValue} 
                    multiline={true}
                    onChangeText={this._controllInput}
                    returnKeyType={"done"}
                    onBlur={this._endEditting}
                    underlineColorAndroid={"transparent"}
                    />
                    ):(
                    <Text style={[styles.text, isCompleted ? styles.completeText:styles.uncompleteText]}>
                        {text}
                    </Text>
                    )}
                </View>
                    { isEditing ? (
                        <View style={styles.action}> 
                            <TouchableOpacity onPressOut={this._endEditting}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✅</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ):(
                        <View style={styles.action}> 
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✏️</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={ (event) => {
                                event.stopPropagation();
                                deleteToDo(id);
                                }}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
        );
    }
    _toggleComplete = (event) => {
        event.stopPropagation();
        const { isCompleted, completeToDo, uncompleteToDo, id} = this.props
        if(isCompleted) {
            uncompleteToDo(id)
        } else {
            completeToDo(id)
        }
    };
    _startEditing = (event) => {
        event.stopPropagation();
        this.setState({
            isEditing: true,
        });
    }
    _endEditting = (event ) => {
        event.stopPropagation();
        const{toDoValue} = this.state;
        const{id, updateToDo} = this.props;
        updateToDo(id,toDoValue);
        this.setState({
            isEditing: false
        });
        
    }
    _controllInput = (text) => {
        this.setState({
            toDoValue: text
        });
    }
}
const styles = StyleSheet.create({
    container:{
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completeCircle:{
        borderColor:"#bbb"
    },
    uncompleteCircle:{
        borderColor:"#F23657"
    },
    text:{
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completeText:{
        color:"#bbb",
        textDecorationLine:"line-through"
    },
    uncompleteText:{
        color:"#353839"
    },
    column:{
        flexDirection:"row",
        alignItems:"center",
        width: width/2,
    },
    action:{
        flexDirection:"row",
    },
    actionContainer:{
        marginVertical:10,
        marginHorizontal:10,
    },
    input:{
        width: width / 2,
        marginVertical: 15,
        paddingBottom: 5
    }
});
