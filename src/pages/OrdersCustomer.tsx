import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StatusBar, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { HeaderLeft } from "../components";
import styles from "./styles";
import {
  fetchImageData,
  fetchMoreImageData
} from "../redux/actions/fetch";
import { GetOrders } from "../redux/actions/orderAction";
import { AppState } from "../redux/store";
import { IOrderItem } from "../redux/models/orderModel";
import customer from "./customer";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  orders: IOrderItem[],
  isOrderLoading: boolean,
  GetOrders : (customerId:number) => void;
}

const DATA = [
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d22',
    title: 'Mustafa Başbig',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Oğuz Marifetdsd',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Şenol Keskindsd',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Cihan Şimşirdsd',
  },
  
];

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
}

class OrdersCustomer extends Component<Props, State> {
  
  componentWillMount() {
    this.props.GetOrders(this.props.navigation.getParam("customerId"));
  }


  _renderView(){
    const {orders, isOrderLoading,navigation} = this.props;
    console.log(isOrderLoading);
    if(isOrderLoading){
      return (<ActivityIndicator></ActivityIndicator>);
    }
    else{
      return (<FlatList
        data={this.props.orders}
        renderItem={({ item }) => 
          <View style={styles.orderContainer}>
            <View style={styles.row_cell1}>
              <View style={styles.row_cell3}>
              <Text style={styles.urunAdiText}>{item.productName}</Text>
              <Text style={styles.tarihText}>25 Ekim 2019</Text>
              </View>
              <View style={styles.row_cell3}>
              <Text style={styles.urunAdetText}>Adet: {item.count}</Text>
              <Text style={styles.birimFiyatText}>Birim Fiyat: {item.unitPrice}TL</Text>
              <Text style={styles.toplamFiyatText}>Toplam Fiyat: {item.totalPrice}TL</Text>
            </View>
            </View>
            
            
          </View>}
        keyExtractor={item => item.orderId.toString()}
      />);
    }
  }


  render() {
    const { navigation,} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <HeaderLeft
          title="Detay"
          leftButtonPress={() => this.props.navigation.navigate("Customer")}
        />
        <View style={{marginTop:10}}></View>
        {this._renderView()}
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isOrderLoading : state.orders.isOrderLoading,
  orders : state.orders.orders
});

function bindToAction(dispatch: any,) {
  return {
    GetOrders: (customerId:number) =>
    dispatch(GetOrders(customerId))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(OrdersCustomer);