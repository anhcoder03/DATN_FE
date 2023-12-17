import { createSlice } from "@reduxjs/toolkit";

interface NotificationItem {
  _id: string;
  categoryNotification: string;
  customerId: string;
  examinationId: string;
  doctorId: string;
  content: string;
  link: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  customer: any;
}

interface INotification {
  notifications: NotificationItem[];
  totalElements: number;
  isReload: boolean;
}

const initialState: INotification = {
  notifications: [],
  totalElements: 0,
  isReload: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    onSetNotifications: (state, action) => {
      state.notifications = action.payload;
      const unreadMessages = action.payload.filter(
        (item: any) => item.status === 0
      );
      state.totalElements = unreadMessages.length;
    },
    updateTotalElements: (state, action) => {
      const notificationId = action.payload;
      const updatedNotifications = state.notifications.map((item: any) =>
        item._id === notificationId ? { ...item, status: 1 } : item
      );
      state.notifications = updatedNotifications;
      state.totalElements = state.totalElements - 1;
    },
    setLoadingNotification: (state, action) => {
      state.isReload = action.payload;
    },
  },
});

export const {
  onSetNotifications,
  updateTotalElements,
  setLoadingNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
