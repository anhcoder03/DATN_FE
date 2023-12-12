export const renderStatus = (status: any) => {
    if(status == 1) {
      return (
        <span style={{color: '#EDA119'}}>Chưa thực hiện</span>
      )
    }
    if(status == 2) {
      return (
        <span style={{color: '#EDA119'}}>Đã thực hiện</span>
      )
    }
    if(status == 3) {
      return (
        <span style={{color: '#FD4858'}}>Đã huỷ</span>
      )
    }
    else {
      return (
        <span>---</span>
      )
    }
  }