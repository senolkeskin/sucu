import { ICustomerItem } from "./models/homeModel";

export interface State {
    data: any[];
    loading: boolean;
  }

  export interface Action {
    type: string;
    payload: any;
  }

  export interface HomeState{
      customers:ICustomerItem[];
      isHomeLoading :boolean;
  }

  export interface UserState {
    isLoading: boolean;
    isFinished: boolean;
    isSucceed: boolean;
    loginErrorMessage : string;
  
  }