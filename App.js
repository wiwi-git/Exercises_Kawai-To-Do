import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");
export default class extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos:{}
  };
  componentDidMount = () => {
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos);
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput style={styles.input}
            value={newToDo}
            placeholder={"New To Do"}
            placeholderTextColor={"#999"}
            onChangeText={this._controllNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo} />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map( toDos =>
              <ToDo key={toDos.id} {...toDos} deleteToDo={this._deleteToDo}/>
            )}
          </ScrollView>
        </View>
      </View>
    );//return
  }//render
  _controllNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  }
  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID] : {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo:"",
          toDos:{
            ...prevState.toDos,
            ...newToDoObject
          },
        };
        return {...newState};
      });
    }//if not empty
  };//addToDo
  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      return {...newState}
    });
  };//deleteToDo
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200"
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },//card
  input: {
    padding: 20,
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  toDos: {
    alignItems: "center"
  }
});
