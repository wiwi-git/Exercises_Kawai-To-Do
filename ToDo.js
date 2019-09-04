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
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id:PropTypes.string.isRequired
    };

    render(){
        const {isCompleted,isEditing, toDoValue} = this.state
        const {text, id, deleteToDo} = this.props
        return(
            <View style={ styles.container }>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completeCircle:styles.uncompleteCircle]}>
                        </View>
                    </TouchableOpacity>
                    {isEditing ? (
                    <TextInput 
                    value={toDoValue} 
                    style={[styles.text, styles.input, isCompleted ? styles.completeText:styles.uncompleteText]} 
                    multiline={true}
                    onChangeText={this._controllInput}
                    returnKeyType={"done"}
                    onBlur={this._endEditting}>

                    </TextInput>
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
                            <TouchableOpacity onPressOut={ () => deleteToDo(id)}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
        );
    }
    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            }
        });
    };
    _startEditing = () => {
        this.setState({
            isEditing: true,
        });
    }
    _endEditting = () => {
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
        paddingBottom: 5,
    }
})
