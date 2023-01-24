import { StyleSheet, Dimensions } from "react-native";
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:'white'
  },
  button: {
    backgroundColor:"#66ff33",
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    letterSpacing: 0.5
  },
  buttonContainer: {
    justifyContent: 'center',
    height: height /3,
    zIndex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    height: 50,
    borderWidth: 1,
    borderColor: "#66ff33",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10
  }, 
  formButton: {
    backgroundColor: "#66ff33",
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 70,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: 'center',
    flex:1,
    marginTop: 40,
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    top: -20
  },


  result: {
    fontSize: 16,
  },

  title: {
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: "center",
    marginVertical: 20,
    textAlign: "center",
  },

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
    
  },
  loading: {
    //width: 10,
  },

  //selector
  selectorContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    marginHorizontal: 20,
  
  

  },
  selectorMale: {
    textAlign: "center",
    backgroundColor: "gainsboro",
    padding: 10,
    flex: 1,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius:35,
  },
  selectorFemale: {
    textAlign: "center",
    backgroundColor: "gainsboro",
    padding: 10,
    flex: 1,
    borderTopRightRadius: 35,
    borderBottomRightRadius:35,
  },
  loadfun: {
    ...StyleSheet.absoluteFill,
    
  }

  
});

export default styles;