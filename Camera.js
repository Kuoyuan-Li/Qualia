import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Camera({navigation}) {
  const [clicked, setClicked] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isDigits,setIsDigits] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    return () => {
      setClicked(false)
    }
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    let isDigits =  /^\d+$/.test(data);
    if (isDigits){
      // alert(data)  
      navigation.navigate("FoodInfo", {
        barcode: data,
      })


    }else{
      alert(`Invalid barcode with type ${type} and data ${data} has been scanned!`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (clicked) {
  return <View style={styles.container}>
      <View style = {{height : '70%', justifyContent: 'center', alignItems: 'center'}}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill, styles.container}>
        <Image 
          style = {styles.image2}
          source={require('./assets/cameraTarget.png')}/>  
        </BarCodeScanner>        
      </View> 
      {scanned && (
          <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        )}     
      <View style={styles.textContainer}>  
        <View style = {styles.square}>
          <Text style = {{
            fontFamily : 'Arial',
            fontSize : 25}}>
              Position barcode </Text>
              <Text style = {{
            fontFamily : 'Arial',
            fontSize : 25}}>
              in centre </Text>
        </View>         
      </View>
    </View>
  }else {
    return <View >
            <TouchableOpacity onPress = {() => setClicked(true)}>
              <View style = {{paddingTop: 340,
                alignItems : 'center',
                justifyContent: 'center'
                }}>
                <Image 
                style = {styles.image}
                source={require('./assets/camera.png')}/>
              </View>
              <View
              style = {{alignItems : 'center',
                paddingTop: 40}}>
                <Text style = {{fontSize: 30}}>
                  Scan barcode </Text>
              </View>
            </TouchableOpacity>
          </View>
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textContainer : {
    height : '30%',
    alignItems : 'center',
    justifyContent: 'center'
  },
  square : {
    width : 220,
    height : 150,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor : '#EFEEEE'
  },
  horizentalLine : {
    width : 1000,
    height : 1,
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor : '#FA4A0C'
  },
  verticalLine : {
    width : 100,
    height : 570,
    backgroundColor : '#FA4A0C'
  },
  image : {
    alignItems : 'center',
    justifyContent: 'center',
    width : 200,
    height : 200
  },
  image2 : {
    alignItems : 'center',
    justifyContent: 'center',
    width : 420,
    height : 570
  }

});