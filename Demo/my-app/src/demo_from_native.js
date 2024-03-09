import { Text, View, Button, StyleSheet,FlatList ,TextInput,Alert} from 'react-native';
import {useState,useEffect} from "react";
import axios from "axios"

export default function App() {
   const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [inputValue, setInputValue] = useState('');
 const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [idValue, setIdValue] = useState('');
  const sendDataToApi = async () => {
    try {
      const response = await axios.post('https://super-pancake-5p4jj6jvxrw3vgpv-5000.app.github.dev/books', {
        author: input1,
        title: input2,
      });

      // Assuming your API returns a success status code, adjust as needed
      if (response.status === 200) {
        // Handle success, e.g., show a success message
        Alert.alert('Success', 'Data sent successfully!');
      } else {
        // Handle error responses from the API
        Alert.alert('Error', 'Failed to send data to API');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error sending data:', error);
      Alert.alert('Error', 'Network error, please try again later');
    }
  };

  const sendDataToUpdateApi = async (idToUpdate, data1, data2) => {
    try {
      const response = await axios.put(`https://super-pancake-5p4jj6jvxrw3vgpv-5000.app.github.dev/books/${idToUpdate}`, {
        author: data1,
        title: data2,
      });

      // Assuming your API returns a success status code, adjust as needed
      if (response.status === 200) {
        // Handle success, e.g., show a success message
        Alert.alert('Success', 'Data updated successfully!');
      } else {
        // Handle error responses from the API
        Alert.alert('Error', 'Failed to update data');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error updating data:', error);
      Alert.alert('Error', 'Network error, please try again later');
    }
  };

 const sendDataToDeleteApi = async (dataToDelete) => {
    try {
      const response = await axios.delete(`https://super-pancake-5p4jj6jvxrw3vgpv-5000.app.github.dev/books/${dataToDelete}`);

      // Assuming your API returns a success status code, adjust as needed
      if (response.status === 200) {
        // Handle success, e.g., show a success message
        Alert.alert('Success', 'Data deleted successfully!');
      } else {
        // Handle error responses from the API
        Alert.alert('Error', 'Failed to delete data from API');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error deleting data:', error);
      Alert.alert('Error', 'Network error, please try again later');
    }
  };


  const [book,setBook]=useState([]);
  useEffect(()=>{
    onClick();
  },[]);
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
  const onClick=()=>{
    axios.get("https://super-pancake-5p4jj6jvxrw3vgpv-5000.app.github.dev/books")
    .then(response=>{
      console.log(response.data)
      setBook(response.data.books)
    })
    .catch(error=>{
      console.log(error.response)
    })
  }
  console.log(book)
  return (
  <View style={styles.container}>
    <Button title="Show books"
    onPress={onClick}/>
  <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setInput1(text)}
        value={input1}
        placeholder="Author"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setInput2(text)}
        value={input2}
        placeholder="Title"
      />
      <Button
        title="Send"
        onPress={sendDataToApi}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setInputValue(text)}
        value={inputValue}
        placeholder="Enter data to delete"
      />
      <Button
        title="Delete Data from API"
       onPress={() => sendDataToDeleteApi(inputValue)}
      />
      
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setIdValue(text)}
        value={idValue}
        placeholder="Enter ID"
      />
      <View style={{ marginBottom: 10 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setInputValue1(text)}
          value={inputValue1}
          placeholder="Enter new data 1"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
          onChangeText={text => setInputValue2(text)}
          value={inputValue2}
          placeholder="Enter new data 2"
        />
      </View>
      <Button
        title="Update Data in API"
        onPress={() => sendDataToUpdateApi(idValue, inputValue1, inputValue2)}
      />

  <FlatList
    data={book}
    renderItem={({item})=>
      <Text style={styles.item}>
        id:{item.id},{item.author},{item.title}
      </Text>
    }
  />
  </View>
  );
}


