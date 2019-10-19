import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StatusBar, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../components";
import styles from "./styles";
import { AvatarItem } from "../components";
import { logoutUserService } from "../redux/services/user";
import {
  fetchImageData,
  fetchMoreImageData
} from "../redux/actions/fetch";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchImageData: (page?: number, limit?: number) => void;
  fetchMoreImageData: (page?: number, limit?: number) => void;
  imageData: any;
  loading: boolean;
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

  componentDidMount() {
    const { fetchImageData } = this.props;
    const { page, limit } = this.state;
    fetchImageData(page, limit);
  }

  musteriEkle = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AddCustomer");
    });
  };
  musteriInfo = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("InfoCustomer");
    });
  };

  render() {
    const { navigation, imageData, fetchMoreImageData, loading } = this.props;
    const { page, limit } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <Header
          title="Müşteriler"
          rightButtonPress={() => this.musteriEkle()}
        />
        <View style={{marginTop:10}}></View>
        <FlatList
        data={DATA}
        renderItem={({ item }) => <View style={styles.row}>
        <View style={styles.row_cell}>
          <Text style={styles.musteri_adi}>{item.title}</Text>
          <Text style={styles.alt_bilgi}>{item.id}</Text>
        </View>
        <Text style={styles.tikla}
        onPress={() => this.musteriInfo()}>></Text>
      </View>}
        keyExtractor={item => item.id}
      />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  imageData: state.data,
  loading: state.loading
});

function bindToAction(dispatch: any) {
  return {
    fetchImageData: (page?: number, limit?: number) =>
      dispatch(fetchImageData(page, limit)),
    fetchMoreImageData: (page?: number, limit?: number) =>
      dispatch(fetchMoreImageData(page, limit))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Customer);
