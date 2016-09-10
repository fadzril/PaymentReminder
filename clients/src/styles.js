import { StyleSheet, Platform } from 'react-native';
import { MKColor } from 'react-native-material-kit';

module.exports = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  },
  rows: {
      padding: 20,
      flex: 1
  },
  rows1: {
      padding: 20,
      paddingTop: 0,
      paddingBottom: 0,
      flex: 1
  },
  rows2: {
      padding: 20,
      paddingTop: 0,
      paddingBottom: 0,
      flex: 2
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 10, marginBottom: 20,
  },
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 10, marginBottom: 20,
    fontSize: 12,
    fontWeight: '300',
  },
  inputs: {
      marginTop: 10,
      marginBottom: 10,
      height: 30
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 32,
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
  addbutton: {
      height: 50,
      backgroundColor: 'orange',
      marginTop: 20,
      marginLeft: 0,
      marginRight: 0,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
  },
  divider: {
      height: 1,
      borderTopWidth: 1,
      borderTopColor: '#DEDEDE',
      marginTop: 10
  },
  label: {
      fontSize: 16,
      color: '#CCCCCC',
      marginTop: 20,
      marginBottom: 10,
      marginRight: 0,
      marginLeft: 0
  },
  labelSub: {
      fontSize: 10,
      color: 'red'
  },
  picker: {
    height: 100,
    position: 'relative',
    zIndex: 1
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 10,
    marginBottom: 30
  },
  rowlistContainer: {
    margin: 2,
    width: 140,
    height: 30,
    justifyContent: 'flex-start'
  },
  rowlist: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#81c04d',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowlistText: {
      color: '#81c04d',
      textAlign: 'center',
      fontSize: 12,
      flex: 2
  }
});
