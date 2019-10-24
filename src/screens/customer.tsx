import React, { Component } from "react";
import { View, FlatList, StatusBar, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../components";
import styles from "./styles";
import { logoutUserService } from "../redux/services/user";
import {
  fetchImageData,
  fetchMoreImageData
} from "../redux/actions/fetch";
import { GetCustomers } from "../redux/actions/homeAction";
import { AppState } from "../redux/store";
import { ICustomerItem } from "../redux/models/homeModel";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isHomeLoading : boolean;
  customers : ICustomerItem[];
  GetCustomers : () => void;

}

const DATA = [
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d22',
    title: 'Mustafa Baş',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Oğuz Marifet',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Şenol Keskin',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Cihan Şimşir',
  },
  
];

/*function Item(title: any) {
  return (
    <View style={styles.row}>
      <View style={styles.row_cell}>
        <Text style={styles.musteri_adi}>title</Text>
        <Text style={styles.alt_bilgi}>alt bilgi</Text>
      </View>
      <Text style={styles.tikla}>></Text>
    </View>
  );
}*/

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
}

class Customer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20
    };
  }

  componentWillMount() {
    this.props.GetCustomers();
  }

_renderView(){
  const {customers, isHomeLoading,navigation} = this.props;
  console.log(isHomeLoading);
  if(isHomeLoading){
    return (<ActivityIndicator></ActivityIndicator>);
  }
  else{
    return (<FlatList
    data={this.props.customers}
    renderItem={({ item })  => (<View style={styles.row}>
    <View style={styles.row_cell}>
      <Text style={styles.musteri_adi}>{item.nameSurname}</Text>
      <Text style={styles.alt_bilgi}>{item.companyName} {item.customerId}</Text>
      <Text style={styles.detay_bilgi}
    onPress={() => this.props.navigation.navigate("CustomerInfo")}>Detayı görmek için tıklayınız</Text>
    </View>
    <Text style={styles.tikla}
    onPress={() => this.props.navigation.navigate("AddOrder")}>+</Text>
    </View>)}
    keyExtractor={item => item.customerId.toString()}
  />);
  }
}
  render() {
    const { isHomeLoading, customers } = this.props;
    console.log("rendered", customers);
    
    const { page, limit } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <Header
          title="Müşteriler"
          rightButtonPress={() => this.props.navigation.navigate("CustomerAdd")}
        />
        <View style={{marginTop:10}}></View>
      {this._renderView()}
     
      </View>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  isHomeLoading : state.home.isHomeLoading,
  customers : state.home.customers
})
function bindToAction(dispatch: any) {
  return {
    GetCustomers: () =>
    dispatch(GetCustomers())
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Customer);
